<template>
    <div>
        <div class="page-title">
            <h3>История записей</h3>
        </div>

        <div class="history-chart">
            <canvas></canvas>
        </div>

        <section>
            <HistoryTable />
        </section>
    </div>
</template>

<script>
    import HistoryTable from "../components/HistoryTable";

    export default {
        name: "History",
        data: () => ({
            loading: true,
            records: [],
            categories: []
        }),
        async mounted() {

            // this.records = await this.$store.dispatch('fetchRecords')
            const records = await this.$store.dispatch('fetchRecords')
            this.categories = await this.$store.dispatch('fetchCategories')
            this.records = records.map(record => {
                return {
                    ...record,

                }
            })
        },
        components: {
            HistoryTable
        }
    }
</script>

<style scoped>

</style>