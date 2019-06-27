import axios from 'axios'

export async function loadgeo(context: any) {
    // axios
    //     .get("http://localhost:8080/cities")
    //     .then(response => {
    //         context.commit('updateGeojson', response.data)
    //     })
    const response = await axios.get("http://localhost:8080/cities")
    context.commit('updateGeojson', response.data)
}
