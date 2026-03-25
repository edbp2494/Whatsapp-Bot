const flows = require('./flows/dt_flows.js');

async function runAll(client) {
  const results = [];
  const botNumber = process.env.BOT_NUMBER;

  for (let i = 0; i < flows.length; i++) {
    const flow = flows[i];
    const flowResult = await runFlow(client, flow, botNumber);
    results.push(flowResult);

    // 5000ms delay between flows (except after last one)
    if (i < flows.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  return results;
}

async function runSingle(client, flowId) {
  const botNumber = process.env.BOT_NUMBER;
  const flow = flows.find(f => f.id === flowId);

  if (!flow) {
    throw new Error(`Flow with id ${flowId} not found`);
  }

  return [await runFlow(client, flow, botNumber)];
}

async function runFlow(client, flow, botNumber) {
  const flowResult = {
    id: flow.id,
    name: flow.name,
    steps: []
  };

  for (let i = 0; i < flow.steps.length; i++) {
    const step = flow.steps[i];
    const stepResult = await runStep(client, botNumber, step);
    flowResult.steps.push(stepResult);

    // 2000ms delay between steps (except after last one)
    if (i < flow.steps.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  return flowResult;
}

async function runStep(client, botNumber, step) {
  const stepResult = {
    sent: step.send,
    expected: step.expect,
    actual: '',
    status: 'TIMEOUT',
    description: step.description
  };

  try {
    // Send message
    const message = String(step.send);
    await client.sendMessage(botNumber, message);
    console.log(`Sent to ${botNumber}: ${message}`);

    // Wait for reply (up to 15000ms)
    const reply = await waitForReply(client, botNumber, 15000);

    if (reply) {
      stepResult.actual = reply;
      // Check if expected string is in reply (case-insensitive)
      if (step.expect === '' || reply.toLowerCase().includes(step.expect.toLowerCase())) {
        stepResult.status = 'PASS';
      } else {
        stepResult.status = 'FAIL';
      }
    } else {
      stepResult.status = 'TIMEOUT';
    }
  } catch (error) {
    console.error('Error during step:', error);
    stepResult.status = 'FAIL';
    stepResult.actual = `Error: ${error.message}`;
  }

  return stepResult;
}

async function waitForReply(client, botNumber, timeout) {
  return new Promise((resolve) => {
    const cleanup = () => {
      clearTimeout(timer);
      client.removeListener('message', messageHandler);
    };

    const timer = setTimeout(() => {
      cleanup();
      resolve(null);
    }, timeout);

    const messageHandler = (message) => {
      if (message.from === botNumber && !message.fromMe) {
        cleanup();
        resolve(message.body);
      }
    };

    client.on('message', messageHandler);
  });
}

module.exports = {
  runAll,
  runSingle
};
