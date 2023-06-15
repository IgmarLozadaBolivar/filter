/* CODIGO PARA EL VIDEO DE FONDO PARA LA SECCION 1 */
// Creacion de un elemento (video)
var videoElement = document.getElementById("videoFondo");

// Funcion carga de video
function videoCarga() {
    var videoFuente = document.createElement("source");
    videoFuente.src = "./videos/car_washing.mp4";
    videoFuente.type = "video/mp4";
    videoElement.appendChild(videoFuente);
    videoElement.load();
}

// Llamado a la funcion (videoCarga)
videoCarga();

/* FUNCION DE SCROLL TOP */
function scrollToTop() {
    // Creamos el objeto que nos permitira hacer scroll hacia arriba
    document.documentElement = 0;
}

/* CODIGO JS PARA LA SECCION 2: GESTION DE CLIENTES */
// Datos de clientes
var clientes = [];
var clienteIdCounter = 1; // Contador para generar ID's únicos para cada cliente

// Función para registrar un nuevo cliente
function registrarCliente(event) {
    event.preventDefault();

    // Obtener los valores del formulario ingresados por el usuario
    var numeroIdentificacion = document.getElementById("numeroIdentificacion").value;
    var nombres = document.getElementById("nombres").value;
    var apellidos = document.getElementById("apellidos").value;
    var placaAuto = document.getElementById("placaAuto").value;
    var tipo = document.getElementById("tipo").value;
    var correoElectronico = document.getElementById("correoElectronico").value;
    var telefono = document.getElementById("telefono").value;

    // Crear un objeto iterable de datos ingresados
    var cliente = {
        id: clienteIdCounter++,
        numeroIdentificacion: numeroIdentificacion,
        nombres: nombres,
        apellidos: apellidos,
        placaAuto: placaAuto,
        tipo: tipo,
        correoElectronico: correoElectronico,
        telefono: telefono,
        puntosFidelizacion: 0 // Iniciar en 0
    };

    clientes.push(cliente);

    document.getElementById("registroClienteForm").reset();

    actualizarListaClientes();
    cargarOpcionesClientes();
}


// Función para buscar clientes por su nombre, apellido o numero de documento
function buscarClientes() {
    var filtro = document.getElementById("buscador").value.toLowerCase();

    // Filtrar clientes
    var clientesFiltrados = clientes.filter(function (cliente) {
        return (
            cliente.nombres.toLowerCase().includes(filtro) ||
            cliente.apellidos.toLowerCase().includes(filtro) ||
            cliente.numeroIdentificacion.toLowerCase().includes(filtro)
        );
    });

    // Actualizar la lista de clientes con los resultados de búsqueda
    actualizarListaClientes(clientesFiltrados);
}

// Función para eliminar un cliente
function eliminarCliente(index) {
    clientes.splice(index, 1);
    actualizarListaClientes();
}

// Función para actualizar la lista de clientes en el HTML
function actualizarListaClientes(clientesMostrar) {
    var tablaClientesElement = document.getElementById("tablaClientes");
    tablaClientesElement.innerHTML = "";

    // Si no se proporciona la lista de clientes a mostrar, se utiliza la lista completa
    if (!clientesMostrar) {
        clientesMostrar = clientes;
    }

    // Creacion de la estructura de la tabla de clientes registrados
    var tablaHTML =
        "<table>" +
        "<tr>" +
        "<th>Número de identificación</th>" +
        "<th>Nombres</th>" +
        "<th>Apellidos</th>" +
        "<th>Placa Auto</th>" +
        "<th>Tipo</th>" +
        "<th>Correo electrónico</th>" +
        "<th>Teléfono</th>" +
        "<th>Acciones</th>" +
        "</tr>";

    // Generar las filas de la tabla con los datos de los clientes
    var filasHTML = clientesMostrar.map(function (cliente, index) {
        return (
            "<tr>" +
            "<td>" + cliente.numeroIdentificacion + "</td>" +
            "<td>" + cliente.nombres + "</td>" +
            "<td>" + cliente.apellidos + "</td>" +
            "<td>" + cliente.placaAuto + "</td>" +
            "<td>" + cliente.tipo + "</td>" +
            "<td>" + cliente.correoElectronico + "</td>" +
            "<td>" + cliente.telefono + "</td>" +
            "<td><button onclick=\"eliminarCliente(" + index + ")\">Eliminar</button></td>" +
            "</tr>"
        );
    });

    // Combinar las filas en el HTML de la tabla
    tablaHTML += filasHTML.join("");

    // Cerrar la tabla
    tablaHTML += "</table>";

    // Agregar la tabla de clientes al elemento HTML
    tablaClientesElement.innerHTML = tablaHTML;
}

// Agregar evento de envío del formulario de registro
document.getElementById("registroClienteForm").addEventListener("submit", registrarCliente);

// Agregar evento de entrada en el campo de búsqueda
document.getElementById("buscador").addEventListener("input", buscarClientes);

// Actualizar la lista de clientes inicialmente
actualizarListaClientes();

/* CODIGO PARA LA SECCION 2: GESTION DE SERVICIOS*/
// Variables globales
let idCounter = 1; // Contador para generar IDs únicos
let listaServicios = []; // Array para almacenar los servicios

// Función para agregar un servicio
function agregarServicio(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente

    // Obtener los valores del formulario
    const nombreServicio = document.getElementById('nombreServicio').value;
    const valorServicio = document.getElementById('valorServicio').value;
    const descripcion = document.getElementById('descripcion').value;
    const puntosFidelizacion = document.getElementById('puntosFidelizacion').value;

    // Crear un objeto iterable con los valores ingresados
    const servicio = {
        id: idCounter++,
        nombre: nombreServicio,
        valorServicio: parseFloat(valorServicio),
        descripcion: descripcion,
        puntosFidelizacion: parseInt(puntosFidelizacion)
    };

    // Agregar el servicio al array y limpiar el formulario automaticamente
    listaServicios.push(servicio);
    limpiarFormulario();
    mostrarListaServicios();
    cargarOpcionesServicios();
}

// Función para limpiar el formulario después de agregar un servicio
function limpiarFormulario() {
    document.getElementById('nombreServicio').value = '';
    document.getElementById('valorServicio').value = '';
    document.getElementById('descripcion').value = '';
    document.getElementById('puntosFidelizacion').value = '';
}

// Función para mostrar la lista de servicios en la tabla
function mostrarListaServicios() {
    const tablaServicios = document.getElementById('listaServicios');
    // Limpiar la tabla
    tablaServicios.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre del Servicio</th>
                <th>Valor del Servicio</th>
                <th>Descripcion del Servicio</th>
                <th>Puntos para Fidelización</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            ${listaServicios.map(generarFilaServicio).join('')}
        </tbody>
    `;
}

// Función auxiliar para generar la fila de una ruta
function generarFilaServicio(servicio) {
    return `
        <tr>
            <td>${servicio.id}</td>
            <td>${servicio.nombre}</td>
            <td>${servicio.valorServicio}</td>
            <td>${servicio.descripcion}</td>
            <td>${servicio.puntosFidelizacion}</td>
            <td>
                <button onclick="eliminarServicio(${servicio.id})">Eliminar</button>
            </td>
        </tr>
    `;
}

// Función para eliminar una ruta
function eliminarServicio(id) {
    // Filtrar el servicio con el ID proporcionado y actualizar el array de servicios
    listaServicios = listaServicios.filter(servicio => servicio.id !== id);
    mostrarListaServicios();
}

// Escuchar el evento submit del formulario y llamar a la función agregarServicio
document.getElementById('agregarServicioForm').addEventListener('submit', agregarServicio);

// Mostrar la lista de servicios inicialmente
mostrarListaServicios();

/* CODIGO JS PARA LA SECCION 3: COMPRA DE SERVICIOS */
// Función para cargar las opciones de clientes en el formulario de compra de servicios
function cargarOpcionesClientes() {
    const clienteSelect = document.getElementById('cliente');
    clienteSelect.innerHTML = clientes.map(cliente => `<option value="${cliente.id}">${cliente.nombres} ${cliente.apellidos}</option>`).join('');
}

// Función para cargar las opciones de servicio en el formulario de compra de servicios
function cargarOpcionesServicios() {
    const servicioSelect = document.getElementById("servicio");
    servicioSelect.innerHTML = "";

    listaServicios.map((servicio) => {
        const option = document.createElement("option");
        option.value = servicio.id;
        option.textContent = `${servicio.nombre} - ${servicio.descripcion}`;
        servicioSelect.appendChild(option);
    });
}

function comprarServicio(event) {
    event.preventDefault();

    const clienteId = parseInt(document.getElementById("cliente").value);
    const servicioId = parseInt(document.getElementById("servicio").value);

    const cliente = clientes.find(cliente => cliente.id === clienteId);
    const servicio = listaServicios.find(servicio => servicio.id === servicioId);

    let valorSinImpuestos = servicio.valorServicio;
    if (typeof valorSinImpuestos !== 'number' || isNaN(valorSinImpuestos)) {
        alert('El valorSinImpuestos no es un número válido.');
        console.error('El valorSinImpuestos no es un número válido.');
        return;
    }

    const impuestoIVA = valorSinImpuestos * 0.14;
    const descuentoEspecial = valorSinImpuestos * 0.06;
    const valorTotal = valorSinImpuestos + impuestoIVA + descuentoEspecial;

    const compraResumen = document.getElementById('compra-resumen');
    compraResumen.innerHTML = '';

    const resumen = document.createElement('p');
    resumen.textContent = `Resumen de la Compra:
        Cliente: ${cliente.nombres} ${cliente.apellidos} 
        Servicio: ${servicio.nombre} - ${servicio.descripcion} - ${servicio.valorServicio}
        Valor del Servicio: $${valorSinImpuestos.toFixed(2)}
        Impuesto IVA (14%): $${impuestoIVA.toFixed(2)}
        Descuento Especial (6%): $${descuentoEspecial.toFixed(2)}
        Total a Pagar: $${valorTotal.toFixed(2)}`;
    compraResumen.appendChild(resumen);

    // Abonar puntos de fidelización al cliente
    cliente.puntosFidelizacion += servicio.puntosFidelizacion;

    // Actualizar la lista de puntos de fidelización
    mostrarPuntosFidelizacion();

    // Limpiar el formulario
    document.getElementById('compra-form').reset();
}

// Escuchar el evento submit del formulario de compra de tiquetes y llamar a la función comprarServicio
document.getElementById('compra-form').addEventListener('submit', comprarServicio);

/* SISTEMA DE FIDELIZACION - SECCION 5 */
// Funcion para mostrar la lista de la tabla de puntos de fidelizacion
function mostrarPuntosFidelizacion() {
    const tableBody = document.getElementById("fidelizacion-body");
    tableBody.innerHTML = "";

    const filasTabla = clientes.map(cliente => {
        const clienteFila = document.createElement("td");
        const puntosFila = document.createElement("td");

        clienteFila.textContent = `${cliente.nombres} ${cliente.apellidos}`;
        puntosFila.textContent = `${cliente.puntosFidelizacion}`;

        const columna = document.createElement("tr");
        columna.appendChild(clienteFila);
        columna.appendChild(puntosFila);
        
        return columna;
    });

    filasTabla.reduce((parent, columna) => {
        parent.appendChild(columna);
        return parent;
    }, tableBody);
}

// Escuchar el evento de submit del formulario de registrar clientes
document.getElementById('registroClienteForm').addEventListener('submit',registrarCliente);
// Escuchar el evento de submit del formulario de agregar servicios
document.getElementById('agregarServicioForm').addEventListener('submit',agregarServicio);
// Escuchar el evento de submit del formulario de comprar servicios
document.getElementById('compra-form').addEventListener('submit',comprarServicio);

// Iniciar la lista de clientes y servicios
actualizarListaClientes();
mostrarListaServicios();
mostrarPuntosFidelizacion();