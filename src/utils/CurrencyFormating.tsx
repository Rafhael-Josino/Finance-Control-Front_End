function CurrencyFormating(value: number) {
    let	 formatedValue: string | number = value.toFixed(2);
    formatedValue = formatedValue.replace(/\D/g, "");
    formatedValue = Number(formatedValue) / 100;
    formatedValue = formatedValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    return formatedValue;
}

export default CurrencyFormating;