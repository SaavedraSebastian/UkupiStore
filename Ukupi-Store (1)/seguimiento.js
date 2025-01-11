document.getElementById('trackingForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const orderNumber = document.getElementById('orderNumber').value;
  if (!orderNumber) {
      document.getElementById('orderNumber').classList.add('is-invalid');
      return;
  } else {
      document.getElementById('orderNumber').classList.remove('is-invalid');
  }
  const orderStatus = 'Entregado';
  let statusText = '';
  let statusIconClass = '';
  switch (orderStatus) {
      case 'Recibido':
          statusText = `El estado del pedido ${orderNumber} es: Recibido`;
          statusIconClass = 'fas fa-check-circle status-icon status-received';
          break;
      case 'Empaquetado':
          statusText = `El estado del pedido ${orderNumber} es: Empaquetado`;
          statusIconClass = 'fas fa-box status-icon status-packed';
          break;
      case 'En camino':
          statusText = `El estado del pedido ${orderNumber} es: En camino`;
          statusIconClass = 'fas fa-truck status-icon status-shipped';
          break;
      case 'Entregado':
          statusText = `El estado del pedido ${orderNumber} es: Entregado`;
          statusIconClass = 'fas fa-home status-icon status-delivered';
          break;
      default:
          statusText = `El estado del pedido ${orderNumber} es: Desconocido`;
          statusIconClass = 'fas fa-question-circle status-icon';
          break;
  }

  document.getElementById('orderStatus').innerText = statusText;
  document.getElementById('statusIcon').firstChild.className = statusIconClass;
  document.getElementById('trackingInfo').classList.remove('d-none');
});
document.addEventListener('keydown', function (e) {
if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
e.preventDefault();
}
});
document.addEventListener('contextmenu', function (e) {
e.preventDefault();
});

