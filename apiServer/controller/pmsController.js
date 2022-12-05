const Post = require('../model/Post');

const checkPMSInfo = async (req, res) => {       
    try {
      if(!req.headers.auth) return res.sendStatus(401);
      const { client_id, client_secret } = JSON.parse(req.headers.auth);
      let post = new Post(client_id, client_secret)
      const [rows, _] = await Post.findAll();
      console.log(rows.length);
      if (!rows.length){
        post = await post.save();
      } else{
        post = await post.update();
      }

      res.json({
        status: `success`,
      });
      
    } catch (error) {
      console.log(error);
    }    
}

const getPMSStatus = (req, res) => {
    if(!req.headers.auth) return res.sendStatus(401);
    console.log("statuses");
    const diffKRTime = 9 * 60 * 60 * 1000;
    let eventTime = new Date(Date.now() + diffKRTime);
    res.json({ status: "success", data:{ id: 999, created: `${eventTime.toISOString()}` , status: "up"} }); // status: up|down
}

const getSiteInfo = (req, res) => {
    if(!req.headers.auth) return res.sendStatus(401);
    console.log("details");
    const { client_id } = JSON.parse(req.headers.auth);
    const diffKRTime = 9 * 60 * 60 * 1000;
    const siteInfo = {
        id: `${client_id}`,
        name: `Hoban Resort1`,
        currency: 'KRW',
        website: "",
        timezone: "KST",
        contact: {
            telephone: "02-2135-4816",
            email: "netbr@netsbridge.com"
        },
        location: {
            address: "",
            street: "",
            city: "Jaecheon",
            state: "ChoongBook",
            postcode: "56689",
            country: "Korea"
        },
        coordinate: {
            latitude: "",
            longitude: "",
        },
        timestamp: `${new Date(Date.now() + diffKRTime).toISOString()}`
        }
    res.json({ 
    "status": "success",
    "data": siteInfo
    });
}

const createSub = async (req, res) => {
  
  try {
    if(!req.headers.auth) return res.sendStatus(401);
    console.log("subscriptions");

    const { client_id, client_secret } = JSON.parse(req.headers.auth);
    let post = new Post(client_id, client_secret) 
        
    const { name, callbackUri } = req.body;
    const diffKRTime = 9 * 60 * 60 * 1000;
    const created = `${new Date(Date.now() + diffKRTime).toISOString()}`;

    console.log( name, callbackUri, created);
    post = await post.saveSub(name,callbackUri,created);
    const [rows, _] = await Post.findAllSub();
    if (rows.length >0 ){
      res.json({
        status: "success",
        data: rows[0]          
      });
    }
    
  } catch (error) {
    console.log(error);
  }
    
}

const getSubById = async (req, res) => {
  if(!req.headers.auth) return res.sendStatus(401);

  const [rows, _] = await Post.findSubById(req.params.id);
  if (rows.length > 0 ){
    res.json({
      status: "success",
      data: rows[0]          
    });
  }
}

const updateSub = async (req, res) => {
  try {
    if(!req.headers.auth) return res.sendStatus(401);
    const { client_id, client_secret } = JSON.parse(req.headers.auth);
    const { name, callbackUri, callbackToken } = req.body;
    let post = new Post(client_id, client_secret);
    let subId = req.params.id;
    const diffKRTime = 9 * 60 * 60 * 1000;
    const updated = `${new Date(Date.now() + diffKRTime).toISOString()}`;
  
    post = await post.updateSub(subId, name, callbackUri, updated, callbackToken);
    const [rows, _] = await Post.findSubUpdatedById(subId)
    if (rows.length > 0 ){
      res.json({
        status: "success",
        data: rows[0]          
      });
    }
  } catch (error) {
    console.log(error)
  }
}

const deleteSub = async (req, res) => {
  try {
    if(!req.headers.auth) return res.sendStatus(401);
    const { client_id, client_secret } = JSON.parse(req.headers.auth);
   
    let post = new Post(client_id, client_secret);
    let subId = req.params.id;   
  
    post = await post.deleteSub(subId);   
    console.log(post);
    res.json({
        status: "success",
        data: post[0].affectedRows         
      });
    
  } catch (error) {
    console.log(error)
  }
}

const getRoomById = async (req, res) => {
  try {
    if(!req.headers.auth) return res.sendStatus(401);
    const roomno = req.params.roomId;
    const [row, _] = await Post.findRoomById(roomno);
    const {status, guestid,firstname, lastname, title, language, vip} = row[0];
    //console.log(row);
    let guests= [];
    if (status ==='Y'){
      guests = [
        {
          "name": {
            "prefix": `${title}`,
            "first": `${firstname}`,
            "middle": null,
            "last": `${lastname}`,
            "suffix": null,
            "full": `${firstname} ${lastname}`
          },
          "balance": null,
          "language": `${language}`,
          "no_post": null,
          "vip_status": `${vip}`,
          "id": `${guestid}`,
          "option": null,
          "channel_preference": null
        }
      ]
    }
    const roomData = {
      "id": `${roomno}`,
      "groupCode": null,
      "guests": guests
    };

    console.log(`room number: ${req.params.roomId}`);
    res.json({
        status: "success",
        data: roomData          
      });

  } catch (error) {
    console.log(error);
  }
  
}

module.exports = {
  checkPMSInfo,
  getPMSStatus,
  getSiteInfo,
  createSub,
  getSubById,  
  updateSub,
  deleteSub,
  getRoomById
}