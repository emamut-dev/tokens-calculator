const { createApp, ref } = Vue;

createApp({
  async mounted() {
    try {
      const response = await fetch(
        'https://co.dolarapi.com/v1/cotizaciones/usd',
      );
      const data = await response.json();
      this.dollarValue = data.venta;
    } catch (error) {
      console.error('Error fetching dollar value:', error);
    }
  },
  setup() {
    const tokenValue = ref(0.05);
    var modelTokens = ref(100),
      percentage = ref(60),
      dollarValue = ref(3600),
      totalValue = ref(0),
      studioValue = ref(0);

    const calcular = () => {
      totalValue.value =
        modelTokens.value * tokenValue.value * dollarValue.value;
      studioValue.value = (totalValue.value * (100 - percentage.value)) / 100;
      return parseUSD(totalValue.value * (percentage.value / 100));
    };

    const parseUSD = (num) => {
      return '$' + Number(num).toLocaleString();
    };

    return {
      tokenValue,
      modelTokens,
      dollarValue,
      percentage,
      calcular,
      totalValue,
      studioValue,
      parseUSD,
    };
  },
}).mount('#app');
