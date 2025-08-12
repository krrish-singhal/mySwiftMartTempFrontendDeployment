

const fetchCategoryWiseProduct = async(category)=>{
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/category-product`,{
        method : "post",
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            category : category
        })
    })

    const dataResponse = await response.json()

    return dataResponse
}

export default fetchCategoryWiseProduct