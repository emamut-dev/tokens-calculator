<script setup>
import { ref, onMounted } from 'vue';

const tokenValue = ref(0.05);
const modelTokens = ref(100);
const percentage = ref(60);
const dollarValue = ref(3600);
const totalValue = ref(0);
const studioValue = ref(0);
const resultado = ref(null);
const loadingRate = ref(false);

onMounted(async () => {
  loadingRate.value = true;
  try {
    const response = await fetch('https://co.dolarapi.com/v1/cotizaciones/usd');
    const data = await response.json();
    dollarValue.value = data.venta;
  } catch (error) {
    console.error('Error fetching dollar value:', error);
  } finally {
    loadingRate.value = false;
  }
});

const parseUSD = (num) => '$' + Number(num).toLocaleString('es-CO');

const calcular = () => {
  totalValue.value = modelTokens.value * tokenValue.value * dollarValue.value;
  studioValue.value = (totalValue.value * (100 - percentage.value)) / 100;
  return parseUSD(totalValue.value * (percentage.value / 100));
};
</script>

<template>
  <div class="container" id="app" v-cloak>
    <div class="row justify-content-center mt-4">
      <div class="col-md-8">
        <h1 class="text-center fw-bold">Calcula el valor de tus Tokens</h1>
        <p class="text-center text-white-50">
          Ingresa los datos y obtén el desglose de ganancias para modelo y
          estudio de manera instantánea.
        </p>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-5 border border-secondary rounded-5 p-5">
        <h4 class="fw-bold">
          <i class="bi bi-graph-up text-warning"></i> Parámetros de Cálculo
        </h4>
        <form @change="calcular">
          <div class="mt-4">
            <label for="tokens-value" class="form-label"
              ><i class="bi bi-coin text-warning"></i> Cantidad de Tokens</label
            >
            <input
              type="number"
              class="form-control bg-dark text-white border-3 border-warning"
              id="tokens-value"
              v-model="modelTokens"
              autocomplete="off"
              min="0"
            />
          </div>
          <div class="mt-4">
            <label for="percentage" class="form-label"
              ><i class="bi bi-percent text-warning"></i> Porcentaje para la
              modelo</label
            >
            <input
              type="range"
              class="form-range"
              id="percentage"
              min="0"
              max="100"
              v-model="percentage"
            />
            <div class="input-group mt-1 w-50">
              <input
                type="number"
                class="form-control bg-dark text-white border-3 border-warning"
                v-model="percentage"
                id="percentage-input"
                min="0"
                max="100"
              />
              <span
                class="input-group-text bg-dark text-white border-3 border-warning"
                >%</span
              >
            </div>
          </div>
          <div class="mt-4 w-50">
            <label for="token-value" class="form-label"
              ><i class="bi bi-coin text-warning"></i> Valor por Token
            </label>
            <div class="input-group mt-1">
              <span
                class="input-group-text bg-dark text-white border-3 border-warning"
                >$</span
              >
              <input
                type="number"
                class="form-control bg-dark text-white border-3 border-warning"
                id="token-value"
                v-model="tokenValue"
              />
            </div>
          </div>
          <div class="mt-4">
            <label for="dollar-value" class="form-label"
              ><i class="bi bi-currency-dollar text-warning"></i> TRM del Dólar
              &nbsp;
            </label>
            <a
              href="#"
              data-bs-toggle="tooltip"
              data-bs-title="Valor tomado automáticamente desde la API de DolarAPI, puedes modificarlo si lo deseas"
              ><i class="bi bi-info-circle text-warning"></i
            ></a>
            <div class="input-group mt-1">
              <span
                class="input-group-text bg-dark text-white border-3 border-warning"
                >$</span
              >
              <input
                type="number"
                class="form-control bg-dark text-white border-3 border-warning"
                id="dollar-value"
                v-model="dollarValue"
              />
            </div>
          </div>
        </form>
      </div>
      <div class="col mt-4 mt-md-0">
        <div class="text-center border border-secondary rounded-5 p-4">
          <p><i class="bi bi-person text-warning"></i> Valor para la modelo</p>
          <p class="big-text text-warning fw-bold">{{ calcular() }} <br /></p>
          <p class="small">{{ percentage }}% del total producido</p>
        </div>
        <div class="d-flex flex-row justify-content-between w-100 gap-1">
          <div
            class="text-center border border-secondary rounded-5 p-4 mt-4 flex-fill"
          >
            <p>
              <i class="bi bi-building text-warning"></i> Valor para el estudio
            </p>
            <p class="h2 fw-bold">{{ parseUSD(studioValue) }}</p>
          </div>
          <div
            class="text-center border border-secondary rounded-5 p-4 mt-4 flex-fill"
          >
            <p class="text-center">
              <i class="bi bi-graph-up text-warning"></i> Total producido
            </p>
            <p class="h2 fw-bold">{{ parseUSD(totalValue) }}</p>
          </div>
        </div>
      </div>
    </div>
    <footer class="row">
      <div class="col text-center">
        <p class="text-white-50 mt-5 mb-3">
          <i class="bi bi-rocket-takeoff text-warning"></i> Powered by
          <a
            class="text-warning"
            href="https://emamut.netlify.app/"
            target="_blank"
            >emamut</a
          >
        </p>
      </div>
    </footer>
  </div>
</template>
