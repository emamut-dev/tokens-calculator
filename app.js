const { createApp, ref } = Vue;

createApp({
  setup() {
    const tokenValue = ref(0.05);
    var modelTokens = ref(100),
      percentage = ref(60),
      dollarValue = ref(3500);

    const calcular = () => {
      return parseUSD(
        modelTokens.value *
          tokenValue.value *
          dollarValue.value *
          (percentage.value / 100),
      );
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
    };
  },
}).mount('#app');
