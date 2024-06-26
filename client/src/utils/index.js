import axios from "axios"; 
const API_URL = "http://localhost:8800/api-v1";

export const API = axios.create({
    baseURL: API_URL,
    responseType:"json",
});

export const apiRequest = async({url, token, data,method}) => {
    try{
        const result = await API(url, {
            method: method || "GET",
            data: data,
            headers:{
                "Content-Type":"application/json",
        Authorization: token ? 'Bearer ${token}' :
        "",       
            }       
         });
         return result?.data;
    }catch(error) {
        const err = error.response.data;
        console.log(err);
        return {status: err.success, message: err.message};
    }
}

export const handleFiledUpload = async (uploadFile) => {
    const formData = new FormatData();
    formData.append("file", uploadFile);
    formData.append("upload_preset","jonfinder");
try{
    const response = await axios.post(
        "https://console.cloudinary.com/settings/c-fc4f2ed81619ef3c07e2a690426fe9/upload_presets/new",
        formData
    );
    return response.data.secure_url;
}catch (error){
    console.log(error);
}
};

export const updateURL =({
    pageNum,
    query,
    cmpLoc,
    sort,
    navigate, 
    location,
    jType,
    exp,
}) => {
  const params = new URLSearchParams();

   if (pageNum && pageNum > 1) {
    params.set("page",pageNum);
   }

   if (query) {
    params.set("search",query);
   }

   if (cmpLoc) {
    params.set("Location", cmpLoc);
    }

    if (sort) {
        params.set("sort", sort);
    }

    if (jType) {
        params.set("jtype",jType);
    }

    if(exp){
        params.set("exp", exp);
    }

    const newURL = '${locaton.pathname}?${paramstoString()}';
    navigate(newURL, {replace: true });

    return newURL
};