<template>
    <div>
        <div class="form-inline">
            <a v-if="criar && !modal" v-bind:href="criar">Criar</a>
            <ModalLink v-if="criar && modal" tipo="link" nome="Adicionar" titulo="Criar" css=""></ModalLink>
            <div class="form-group pull-right">
                <input type="search" class="form-control" placeholder="Buscar" v-model="buscar">
            </div>
        </div>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th style="cursor: pointer;" v-on:click="orderColumn(index)" v-for="(titulo, index) in titulos"
                        :key="index">{{ titulo }}</th>
                    <th v-if="detalhe || editar || deletar">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in lista" :key="index">
                    <td v-for="i in item" v-bind:key="i">{{ i }}</td>
                    <td v-if="detalhe || editar || deletar">
                        <form v-bind:id="index" v-if="deletar && token" v-bind:action="deletar + item.id" method="post">
                            <input type="hidden" name="_method" value="DELETE" />
                            <input type="hidden" name="_token" v-bind:value="token" />
                            <a v-if="detalhe && !modal" v-bind:href="detalhe"> Detalhe | </a>
                            <ModalLink v-if="detalhe && modal" v-bind:item="item" v-bind:url="detalhe" tipo="link"
                                nome="detalhe" titulo="Detalhes |" css=""></ModalLink>
                            <a v-if="editar && !modal" v-bind:href="editar"> Editar | </a>
                            <ModalLink v-if="editar && modal" v-bind:item="item" tipo="link" nome="editar"
                                v-bind:url="editar" titulo="Editar |" css=""></ModalLink>
                            <ModalLink v-if="editar && modal" v-bind:item="item" tipo="link" nome="editar"
                                v-bind:url="editar" titulo="Editar |" css=""></ModalLink>
                            <a href="#" v-on:click="executaForm(index)">Deletar</a>
                        </form>

                        <span v-if="!token">
                            <a v-if="detalhe && !modal" v-bind:href="detalhe"> Detalhe | </a>
                            <ModalLink v-if="detalhe && modal" v-bind:item="item" tipo="link" v-bind:url="detalhe"
                                nome="detalhe" titulo="Detalhes |" css=""></ModalLink>
                            <a v-if="editar && !modal" v-bind:href="editar"> Editar </a>
                            <ModalLink v-if="editar && modal" v-bind:item="item" tipo="link" nome="editar"
                                v-bind:url="editar" titulo="Editar" css=""></ModalLink>
                            <a v-if="deletar" v-bind:href="deletar">Deletar</a>
                        </span>

                        <span v-if="token && !deletar">
                            <a v-if="detalhe && !modal" v-bind:href="detalhe"> Detalhe | </a>
                            <ModalLink v-if="detalhe && modal" v-bind:item="item" v-bind:url="detalhe" tipo="link"
                                nome="detalhe" titulo="Detalhe |" css=""></ModalLink>
                            <a v-if="editar && !modal" v-bind:href="editar"> Editar </a>
                            <ModalLink v-if="editar && modal" v-bind:item="item" tipo="link" nome="editar"
                                v-bind:url="editar" titulo="Editar" css=""></ModalLink>
                            <a v-if="deletar" v-bind:href="deletar">Deletar</a>
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

import ModalLink from "./modal/ModalLink";

export default {
    props: ['titulos', 'itens', 'ordem', 'ordemcol', 'criar', 'detalhe', 'editar', 'deletar', 'token', 'modal'],

    data: function () {
        return {
            buscar: '',
            ordemAux: this.ordem || "asc",
            ordemAuxCol: this.ordemcol || 0,
        }
    },

    components: {
        ModalLink,
    },

    methods: {
        executeForm: function (index) {
            document.getElementById(index).submit();
        },
        orderColumn: function (column) {
            this.ordemAuxCol = column;
            if (this.ordemAux.toLowerCase() == "asc") {
                this.ordemAux = 'desc';
            } else {
                this.ordemAux = 'asc';
            }
        }
    },

    computed: {
        lista: function () {

            let lista = this.itens.data;
            let ordem = this.ordemAux || "asc";
            let ordemcol = this.ordemAuxCol || 0;

            ordem = ordem.toLowerCase();
            ordemcol = parseInt(ordemcol);

            if (ordem == 'asc') {
                lista.sort(function (a, b) {
                    if (Object.values(a)[ordemcol] > Object.values(b)[ordemcol]) { return 1; }
                    if (Object.values(a)[ordemcol] < Object.values(b)[ordemcol]) { return -1; }
                    return 0;
                });
            } else {
                lista.sort(function (a, b) {
                    if (Object.values(a)[ordemcol] < Object.values(b)[ordemcol]) { return 1; }
                    if (Object.values(a)[ordemcol] > Object.values(b)[ordemcol]) { return -1; }
                    return 0;
                });
            }

            if (this.buscar) {
                return lista.filter(res => {
                    res = Object.values(res);
                    for (let k = 0; k < res.length; k++) {
                        if ((res[k] + "").toLowerCase().indexOf(this.buscar.toLowerCase()) >= 0) {
                            return true;
                        }
                    }
                    return false;
                });

            }

            return lista;
        }
    }
}
</script>