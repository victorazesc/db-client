<template>

  <section>
    <heading></heading>

    <main>

      <section class="section section-lg bg-gradient-default">
        <div class="container">
          <br><br><br>
          <h2 class="text-white text-center">Nós da DB Assuntos Regulatórios temos os seguintes Serviços para Oferecer:
          </h2>
          <br>
          <div class="row row-grid justify-content-center">
            <div class="col-lg-12 text-center">


              <div class="accordion" role="tablist">
                <b-card no-body class="mb-0">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-1 class="btn-link">
                      Autorizações e Certificações de Empresas
                    </b-button>
                  </b-card-header>
                  <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <b-card-text>
                        Para que uma empresa possa atuar com produtos regulados pela Vigilância Sanitária, é necessário,
                        primeiramente, que ela possua as autorizações dos órgãos de vigilância sanitária para realizar
                        atividades relacionadas a esses produtos nos âmbitos Municipal, Estadual e Nacional. Para tanto,
                        ela deve cumprir os requisitos técnicos e administrativos constantes na Legislação vigente.

                        A DB - Assuntos Regulatórios está apta a auxiliar nossos parceiros na obtenção da Licença de
                        funcionamento emitida pela Vigilância Sanitária local e da Autorização de Funcionamento de
                        Empresa (AFE) concedida pela ANVISA para todas as atividades a serem realizadas.
                      </b-card-text>
                    </b-card-body>
                  </b-collapse>
                </b-card>

                <b-card no-body class="mb-0">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-2 class="btn-link">
                      Certificação de Boas Práticas
                    </b-button>
                  </b-card-header>
                  <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <b-card-text>
                        <p>Em um mercado cada vez mais exigente com a qualidade dos produtos disponíveis, a obtenção de
                          Certificados de Boas Práticas de Fabricação (CBPF) e de Boas Práticas de Armazenamento e
                          Distribuição (CBPAD) se torna cada vez mais relevante.</p>
                        <p>
                          As Boas Práticas de Fabricação e Distribuição e de Armazenamento e Distribuição consistem em
                          um conjunto de medidas e procedimentos que devem ser adotados pelas empresas que fazem parte
                          do ciclo de vida dos produtos a fim de garantir a qualidade e a conformidade dos produtos por
                          meio de um Sistema de Gestão da Qualidade. </p>
                        <p>
                          Em áreas como a de Produtos para Saúde e Medicamentos a Certificação de Boas Praticas pode ser
                          obrigatória a depender do produto, sendo este, mais um requisito para que a empresa possa
                          exercer suas atividades. Em outras áreas, porém, a Certificação não é obrigatória, mas é um
                          diferencial no competitivo mercado atual. </p>
                      </b-card-text>
                    </b-card-body>
                  </b-collapse>
                </b-card>

                <b-card no-body class="mb-0">
                  <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-button block v-b-toggle.accordion-3 class="btn-link" style="word-break: break-word;
    white-space: break-spaces;">
                      Registros, Cadastros e Notificação de Produtos
                    </b-button>
                  </b-card-header>
                  <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                    <b-card-body>
                      <b-card-text>
                        Para que produtos cosméticos, medicamentos, saneantes, produtos para saúde, alimentos e produtos
                        derivados do tabaco possam ser comercializados, é necessária a sua devida regularização junto à
                        Agencia Nacional de Vigilância Sanitária - ANVISA. A DB é capaz de atuar com nossos parceiros
                        durante todas as etapas da regularização do produto: fabricação, importação, distribuição e
                        transporte de forma ágil e apropriada.
                      </b-card-text>
                    </b-card-body>
                  </b-collapse>
                </b-card>
              </div>


              <br><br>
              <router-link class="btn btn-white btn-round btn-block btn-lg" to="contato">
                Contate-nos
              </router-link>

            </div>
          </div>
        </div>
      </section>
    </main>

    <footered></footered>

  </section>


</template>

<script>

import heading from './heading'
import footered from './footer'

export default {
  name: "landing",
  components: {
    heading,
    footered
  }
};
</script>


<style lang="scss" src="./argon.scss" scoped>