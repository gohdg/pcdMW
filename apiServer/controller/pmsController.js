const checkPMSInfo = (req, res) => {
    if(!req.headers.auth) return res.sendStatus(401);
  
    const { client_id, client_secret } = JSON.parse(req.headers.auth);
    const { name, pmsType, host, port, auth, pollingSeconds } = req.body;
  
    console.log(req.headers.auth);
    console.log(
      `${name} ${pmsType} ${host} ${port} ${auth.client_id} ${auth.client_secret} ${pollingSeconds}`
    );
    console.log(`check client_id: ${client_id}, client_secret: ${client_secret}`);
    res.json({
      status: `success`,
    });
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

const createSubscription = (req, res) => {
    if(!req.headers.auth) return res.sendStatus(401);
    console.log("subscriptions");
        
    const { name, callbackUri } = req.body;
    const diffKRTime = 9 * 60 * 60 * 1000;
    
    res.json({
        status: "success",
        data: {
            id: 1,
            created: `${new Date(Date.now() + diffKRTime).toISOString()}`,
            name: `${name}`,
            callbackUri: `${callbackUri}`      
        }
    });
}

const getSubscription = (req, res) => {
  if(!req.headers.auth) return res.sendStatus(401);
  console.log(`subscription id: ${req.params.id}`);
  res.json({ success: `subscriptions id: ${req.params.id}` });
}

const getRoomInfo = (req, res) => {
  if(!req.headers.auth) return res.sendStatus(401);
  console.log(`room number: ${req.params.roomId}`);
  res.json({ success: `room ${req.params.roomId}` });
}

module.exports = {
  checkPMSInfo,
  getPMSStatus,
  getSiteInfo,
  createSubscription,
  getSubscription,
  getRoomInfo
}