import axios from 'axios';


const consogarageController = {
    affairespage: async (req, res) => {
        const affairesApiUrl = `https://www.consogarage.com/consogarage-api/api/affaires.php`
        try{
            const response = await axios.get(affairesApiUrl);
            const data = response.data;
            res.render('pages/consogarage/affaires.ejs',{affaires:data});
        }catch(e){
            res.status(500).send('Error fetching quotations data');
        }
        
    }
};

export default consogarageController;
