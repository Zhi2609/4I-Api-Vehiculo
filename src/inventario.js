export class Inventario {
    constructor() {
        this.vehiculos = []
    }

    agregarVehiculo(vehiculo) {
        this.vehiculos.push(vehiculo)
    }

    buscarVehiculo(placa) {
        return this.vehiculos.find(v => v.placa === placa)
    }

    eliminarVehiculo(placa) {
        const indice = this.vehiculos.findIndex(v => v.placa === placa)
        if (indice === -1) return null  // maneja placa inexistente
        return this.vehiculos.splice(indice, 1)[0]
    }

    listarVehiculos() {
        return this.vehiculos
    }
}