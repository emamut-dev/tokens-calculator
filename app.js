const { createApp, ref } = Vue;

createApp({
  setup() {
    const tokenValue = ref(0.05);
    var modelTokens = ref(100),
      percentage = ref(60),
      dollarValue = ref(3500),
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
