import Vue from "vue";

const filters = [
  Vue.filter("capitalize", function(value) {
    if (!value) return "";
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
  }),

  Vue.filter("icon", function(value) {
    let protocol =
      window.location.hostname === "localhost" ? "http://" : "https://";
    let baseURL = protocol + window.location.host;
    value = baseURL + "/icons/" + value + ".png";
    return value;
  }),

  Vue.filter("phone", function(value) {
    if (!value) return "";
    else if (value.length === 11) {
      return (
        "(" +
        value[0] +
        value[1] +
        ")" +
        " " +
        value[2] +
        " " +
        value[3] +
        value[4] +
        value[5] +
        value[6] +
        "-" +
        value[7] +
        value[8] +
        value[9] +
        value[10]
      );
    } else if (value.length === 10) {
      return (
        "(" +
        value[0] +
        value[1] +
        ")" +
        " " +
        value[2] +
        value[3] +
        value[4] +
        value[5] +
        "-" +
        value[6] +
        value[7] +
        value[8] +
        value[9]
      );
    }
  }),

  Vue.filter("date", function(value) {
    if (!value) return "";
    value = value.split("-");
    return value[2] + "/" + value[1] + "/" + value[0];
  }),

  Vue.filter("dateTime", function(value) {
    if (!value) return "";
    return (
      value[8] +
      value[9] +
      "/" +
      value[5] +
      value[6] +
      "/" +
      value[0] +
      value[1] +
      value[2] +
      value[3] +
      " " +
      value[11] +
      value[12] +
      value[13] +
      value[14] +
      value[15]
    );
  }),

  Vue.filter("document", function(value) {
    if (!value) return "";
    value = value.toString().split("");
    if (value.length === 11) {
      return (
        value[0] +
        value[1] +
        value[2] +
        "." +
        value[3] +
        value[4] +
        value[5] +
        "." +
        value[6] +
        value[7] +
        value[8] +
        "-" +
        value[9] +
        value[10]
      );
    } else if (value.length > 11) {
      return (
        value[0] +
        value[1] +
        "." +
        value[2] +
        value[3] +
        value[4] +
        "." +
        value[5] +
        value[6] +
        value[7] +
        "/" +
        value[8] +
        value[9] +
        value[10] +
        value[11] +
        "-" +
        value[12] +
        value[13]
      );
    }
  }),

  Vue.filter("translate", function(value) {
    let fields = {
      name_client: "Nome do Cliente",
      client: "Cliente",
      first_name: "Nome",
      last_name: "Sobrenome",
      document_client: "Documento",
      telephone_client: "Telefone",
      cellphone_client: "Celular",
      email_client: "Email",
      city_client: "Cidade",
      cep_client: "CEP",
      question: "Questão",
      action: "Ação",
      certificate_name: "Nome da Certidão",
      certificate_number: "Numero da Certidão",
      alert_days: "Dias para Vencimento",
      emission_date: "Data da Emissão",
      due_date: "Data de Vencimento",
      created_at: "Data de Criação",
      amount: "Valor",
      service_name: "Serviço",
    };

    return fields[value];
  }),
];

export default filters;
