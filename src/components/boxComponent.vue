<template>
    <b-card :class="bgCor" class="small-box">
        <h5 class="text-mobile">{{ titulo }}</h5>
        <b-media>
            <template #aside>
                <span class="icon"><i v-bind:class="['fa', icone]"></i></span>
            </template>
            <h5 class="mt-0 title">{{ titulo }}</h5>
            <h3 class="mb-0 mt-1 qnt">
                <b>{{ numero }}</b>
            </h3>
        </b-media>
    </b-card>

</template>

<script>
export default {
    props: {
        titulo: String,
        numero: Number,
        icone: String,
        cor: String,
    },
    computed: {
        bgCor: function () {
            return "bg-" + (this.cor || "bg-primary")
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    background: #fff;
    transition: all .3s ease;

    a {
        text-decoration: none !important;
    }
}

.card:hover {
    background: #4A148C;
    transition: all .3s ease;

    .qnt {
        color: #f9f9f9;
    }

    .title {
        font-size: 20px;
        color: #f9f9f9;
    }

    .media-aside {
        color: #f9f9f9;
    }
}

.small-box {

    border-radius: 2px;
    text-transform: uppercase;
    margin-bottom: 20px;
    box-shadow: 5px 3px 19px rgba(0, 0, 0, 0.1);
    border: none;

    .media-aside {
        font-size: 50px;
        color: #c1c1c1;
    }

    .qnt {
        font-size: 35px;
        color: #673ab7;
    }

    .title {
        font-size: 20px;
        color: #444444;
    }

    .text-mobile {
        display: none;
    }

}

@media (max-width: 768px) {

    .text-mobile {
        display: block !important;
        font-size: 0.9rem;
        text-align: center;
        color: black;

    }

    .card:hover {
        background: #4A148C;

        .qnt {
            color: #f9f9f9;
        }

        .title {
            font-size: 10px !important;
            color: #f9f9f9;
        }

        .media-aside {
            color: #f9f9f9;
        }
    }

    .small-box {
        .media-aside {
            font-size: 25px;
            color: #c1c1c1;
        }

        .qnt {
            font-size: 25px;
            color: #673ab7;
            text-align: right;
        }

        .title {
            font-size: 9px;
            color: #444444;
            display: none;
        }
    }
}
</style>