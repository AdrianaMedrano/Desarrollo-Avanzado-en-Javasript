// Datos iniciales de libros en formato JSON
let biblioteca = {
    "libros": [
        {
            "titulo": "Cien años de soledad",
            "autor": "Gabriel García Márquez",
            "genero": "Realismo mágico",
            "disponible": true
        },
        {
            "titulo": "1984",
            "autor": "George Orwell",
            "genero": "Distopía",
            "disponible": true
        }
    ]
};

// Función para simular la lectura de datos (como si viniera de un archivo JSON)
function leerDatos(callback) {
    setTimeout(() => {
        callback(biblioteca);
    }, 1000);
}

// Función para mostrar todos los libros en consola
function mostrarLibros() {
    leerDatos((datos) => {
        console.log("📚 Inventario de libros:");
        datos.libros.forEach((libro, index) => {
            console.log(`${index + 1}. ${libro.titulo} - ${libro.autor} (${libro.disponible ? 'Disponible' : 'Prestado'})`);
        });
        console.log("--------------------------------------------------");
    });
}

// Función para agregar un nuevo libro
function agregarLibro(titulo, autor, genero, disponible) {
    const nuevoLibro = { titulo, autor, genero, disponible };
    setTimeout(() => {
        biblioteca.libros.push(nuevoLibro);
        console.log(`✅ Libro agregado: "${titulo}"`);
    }, 1000);
}

// Función para cambiar la disponibilidad de un libro
function actualizarDisponibilidad(titulo, nuevoEstado) {
    setTimeout(() => {
        const libro = biblioteca.libros.find(l => l.titulo === titulo);
        if (libro) {
            libro.disponible = nuevoEstado;
            console.log(`🔄 Disponibilidad de "${titulo}" actualizada a: ${nuevoEstado ? 'Disponible' : 'Prestado'}`);
        } else {
            console.log(`❌ Libro "${titulo}" no encontrado.`);
        }
    }, 1000);
}

// Ejecución de ejemplo
mostrarLibros();
agregarLibro("El principito", "Antoine de Saint-Exupéry", "Fábula", true);
actualizarDisponibilidad("1984", false);

// Opcional: ver el inventario actualizado después de unos segundos
setTimeout(() => {
    mostrarLibros();
}, 4000);
