const flows = [
  {
    id: 'mt_orden_sin_rt_asignado',
    name: 'Orden sin RT asignado',
    queue: 'orders',
    steps: [
      { send: '1', expect: 'bienvenida', description: 'Menu principal' },
      { send: '1', expect: 'repartidor', description: 'Submenu de ordenes' },
      { send: '1', expect: 'repartidor', description: 'Opción de orden' },
      { send: '1', expect: 'ID de la orden', description: 'Solicitar ID' },
      { send: '123456789', expect: 'agente', description: 'Validar ID y conectar con agente' }
    ]
  },
  {
    id: 'mt_asignar_carro',
    name: 'Asignar carro',
    queue: 'orders',
    steps: [
      { send: '1', expect: 'bienvenida', description: 'Menu principal' },
      { send: '1', expect: 'repartidor', description: 'Submenu de ordenes' },
      { send: '1', expect: 'repartidor', description: 'Opción de orden' },
      { send: '2', expect: 'ID de la orden', description: 'Asignar carro' },
      { send: '123456789', expect: 'agente', description: 'Validar y conectar con agente' }
    ]
  },
  {
    id: 'mt_reporte_rt',
    name: 'Reporte de RT',
    queue: 'orders',
    steps: [
      { send: '1', expect: 'bienvenida', description: 'Menu principal' },
      { send: '1', expect: 'repartidor', description: 'Submenu de ordenes' },
      { send: '1', expect: 'repartidor', description: 'Opción de orden' },
      { send: '3', expect: 'ID de la orden', description: 'Reporte de RT' },
      { send: '123456789', expect: 'agente', description: 'Validar y conectar con agente' }
    ]
  },
  {
    id: 'mt_problemas_dispersion_si',
    name: 'Problemas dispersión - Sí',
    queue: 'orders',
    steps: [
      { send: '1', expect: 'bienvenida', description: 'Menu principal' },
      { send: '1', expect: 'repartidor', description: 'Submenu de ordenes' },
      { send: '1', expect: 'repartidor', description: 'Opción de orden' },
      { send: '4', expect: 'ID de la orden', description: 'Problemas de dispersión' },
      { send: '1', expect: 'soporte de RT', description: 'Confirmar problema - sí' }
    ]
  },
  {
    id: 'mt_problemas_dispersion_no',
    name: 'Problemas dispersión - No',
    queue: 'orders',
    steps: [
      { send: '1', expect: 'bienvenida', description: 'Menu principal' },
      { send: '1', expect: 'repartidor', description: 'Submenu de ordenes' },
      { send: '1', expect: 'repartidor', description: 'Opción de orden' },
      { send: '4', expect: 'ID de la orden', description: 'Problemas de dispersión' },
      { send: '2', expect: 'ID de la orden', description: 'Confirmar problema - no' },
      { send: '123456789', expect: 'agente', description: 'Validar y conectar con agente' }
    ]
  },
  {
    id: 'mt_producto_no_disponible_shopper_reemplazo',
    name: 'Producto no disponible - Shopper con reemplazo',
    queue: 'products',
    steps: [
      { send: '1', expect: 'bienvenida', description: 'Menu principal' },
      { send: '2', expect: 'producto', description: 'Submenu de productos' },
      { send: '1', expect: 'no disponible', description: 'Producto no disponible' },
      { send: '1', expect: 'shopper', description: 'Tipo Shopper' },
      { send: '1', expect: 'reemplazo', description: 'Con reemplazo' },
      { send: '123456789', expect: 'reemplazo', description: 'ID orden con reemplazo' }
    ]
  },
  {
    id: 'mt_producto_no_disponible_shopper_sin_reemplazo',
    name: 'Producto no disponible - Shopper sin reemplazo',
    queue: 'products',
    steps: [
      { send: '1', expect: 'bienvenida', description: 'Menu principal' },
      { send: '2', expect: 'producto', description: 'Submenu de productos' },
      { send: '1', expect: 'no disponible', description: 'Producto no disponible' },
      { send: '1', expect: 'shopper', description: 'Tipo Shopper' },
      { send: '2', expect: 'nombre del producto', description: 'Sin reemplazo' },
      { send: '123456789', expect: 'nombre del producto', description: 'ID orden sin reemplazo' }
    ]
  },
  {
    id: 'mt_producto_no_disponible_mitienda_unico',
    name: 'Producto no disponible - Mi Tienda (único)',
    queue: 'products',
    steps: [
      { send: '1', expect: 'bienvenida', description: 'Menu principal' },
      { send: '2', expect: 'producto', description: 'Submenu de productos' },
      { send: '1', expect: 'no disponible', description: 'Producto no disponible' },
      { send: '2', expect: 'mitienda', description: 'Tipo Mi Tienda' },
      { send: '3', expect: 'Reprogramar', description: 'Opción única - Reprogramar' }
    ]
  },
  {
    id: 'mt_orden_no_visible_shopper',
    name: 'Orden no visible - Shopper',
    queue: 'products',
    steps: [
      { send: '1', expect: 'bienvenida', description: 'Menu principal' },
      { send: '2', expect: 'producto', description: 'Submenu de productos' },
      { send: '2', expect: 'no visible', description: 'Orden no visible' },
      { send: '1', expect: 'shopper', description: 'Tipo Shopper' },
      { send: '123456789', expect: 'agente', description: 'ID orden - conectar con agente' }
    ]
  },
  {
    id: 'mt_precio_con_error',
    name: 'Precio con error',
    queue: 'products',
    steps: [
      { send: '1', expect: 'bienvenida', description: 'Menu principal' },
      { send: '2', expect: 'producto', description: 'Submenu de productos' },
      { send: '3', expect: 'precio', description: 'Precio con error' },
      { send: '123456789', expect: 'agente', description: 'ID orden - conectar con agente' }
    ]
  },
  {
    id: 'mt_orden_mal_entregada',
    name: 'Orden mal entregada',
    queue: 'products',
    steps: [
      { send: '1', expect: 'bienvenida', description: 'Menu principal' },
      { send: '2', expect: 'producto', description: 'Submenu de productos' },
      { send: '4', expect: 'mal entregada', description: 'Orden mal entregada' },
      { send: '123456789', expect: 'agente', description: 'ID orden - conectar con agente' }
    ]
  },
  {
    id: 'mt_suspensiones',
    name: 'Suspensiones',
    queue: 'store',
    steps: [
      { send: '1', expect: 'bienvenida', description: 'Menu principal' },
      { send: '3', expect: 'tienda', description: 'Submenu de tienda' },
      { send: '1', expect: 'suspensiones', description: 'Suspensiones' },
      { send: '987654321', expect: 'bot', description: 'ID tienda - respuesta del bot' }
    ]
  },
  {
    id: 'mt_apagar_tienda',
    name: 'Apagar tienda',
    queue: 'store',
    steps: [
      { send: '1', expect: 'bienvenida', description: 'Menu principal' },
      { send: '3', expect: 'tienda', description: 'Submenu de tienda' },
      { send: '2', expect: 'apagar', description: 'Apagar tienda' },
      { send: '987654321', expect: 'confirmacion', description: 'ID tienda' },
      { send: '1', expect: 'bot', description: 'Confirmación - respuesta del bot' }
    ]
  },
  {
    id: 'mt_problemas_pago_si',
    name: 'Problemas pago - Sí',
    queue: 'payments',
    steps: [
      { send: '1', expect: 'bienvenida', description: 'Menu principal' },
      { send: '4', expect: 'pago', description: 'Submenu de pagos' },
      { send: '1', expect: 'pago', description: 'Problemas de pago' },
      { send: '1', expect: 'orden', description: 'Confirmar problema - sí' }
    ]
  },
  {
    id: 'mt_problemas_pago_no',
    name: 'Problemas pago - No',
    queue: 'payments',
    steps: [
      { send: '1', expect: 'bienvenida', description: 'Menu principal' },
      { send: '4', expect: 'pago', description: 'Submenu de pagos' },
      { send: '1', expect: 'pago', description: 'Problemas de pago' },
      { send: '2', expect: '', description: 'Confirmar problema - no (sin respuesta esperada)' }
    ]
  },
  {
    id: 'mt_act_cuenta_bancaria_si',
    name: 'Actualizar cuenta bancaria - Sí',
    queue: 'payments',
    steps: [
      { send: '1', expect: 'bienvenida', description: 'Menu principal' },
      { send: '4', expect: 'pago', description: 'Submenu de pagos' },
      { send: '2', expect: 'cuenta', description: 'Actualizar cuenta bancaria' },
      { send: '1', expect: 'agente', description: 'Confirmar acción - conectar con agente' }
    ]
  },
  {
    id: 'mt_solicitud_anterior',
    name: 'Solicitud anterior',
    queue: 'support',
    steps: [
      { send: '1', expect: 'bienvenida', description: 'Menu principal' },
      { send: '5', expect: 'solicitud', description: 'Submenu de solicitudes' },
      { send: '123456789012345', expect: 'bot', description: 'ID solicitud anterior' }
    ]
  }
];

module.exports = flows;
