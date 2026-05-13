<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow">
          <div class="card-header bg-primary text-white text-center">
            <h4>Stellar Traffic App</h4>
          </div>
          <div class="card-body text-center">
            <h5 class="card-title mb-3">¡Bienvenido a tu entorno de trabajo!</h5>
            <p class="card-text text-muted mb-4">
              La integración de <strong>Laravel 11</strong>, <strong>Vue.js 3</strong> y <strong>Bootstrap 5</strong> se ha realizado con éxito.
            </p>
            <button class="btn btn-success" @click="count++">
              Contador de clics en Vue: {{ count }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      count: 0
    };
  }
};
</script>
