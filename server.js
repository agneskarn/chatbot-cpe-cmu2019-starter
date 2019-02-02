const express = require('express')
const middleware = require('@line/bot-sdk').middleware
const Client = require('@line/bot-sdk').Client;
const app = express()



const config = {
  channelAccessToken: 'HkGo35qA+7tEjFfF/5pAHxQ4laPCeohMs1XNtDNIekDQGdZU81VUy+cyaD3uP023XwZLldjUz6DNVckguBiHy/uB+gwXrhe4pbP9flUl0mBmoUF1kbj4IX7wjMKWSNF+AJFe7+kjeNQbyFwvqTX2aQdB04t89/1O/w1cDnyilFU=',
  channelSecret: '0488d88a18a702e14c9d61baa0d1aa8e'
}

const client = new Client(config)

app.get('/', function (req, res) { 
    res.send('Hello World!!')

})

app.post('/webhook', middleware(config), (req, res) => {
  res.send('asadad') // bot reply
  const event = req.body.events[0]; // recieve msg

  if (event.type === 'message') {
    const message = event.message; // keep msg
    console.log(message)
    /*client.replyMessage(event.replyToken, { // reply msg
        //type: 'text',
        //text: message.type // change from msg to msg.text
        type: "sticker",
        packageId: "11539",
        stickerId: "52114112"
      
    }); */
   client.replyMessage(event.replyToken, {
        "type": "template",
        "altText": "this is a carousel template",
        "template": {
            "type": "carousel",
            "columns": [
                {
                  "thumbnailImageUrl": "https://vignette.wikia.nocookie.net/line/images/b/bb/2015-brown.png/revision/latest?cb=20150808131630",
                  "imageBackgroundColor": "#FFFFFF",
                  "title": "this is menu",
                  "text": "description",
                  "actions": [
                      {  
                          "type":"cameraRoll",
                          "label":"Camera roll"
                      },
                      {  
                        "type":"location",
                        "label":"Location"
                     }
                  ]
                },
                {
                  "thumbnailImageUrl": "https://c.76.my/Malaysia/line-brown-bear-cute-pencil-case-ubiyo-1802-02-Ubiyo@6.jpg",
                  "imageBackgroundColor": "#000000",
                  "title": "this is menu",
                  "text": "description",
                  "actions": [
                    {
                      "type":"datetimepicker",
                      "label":"Select date",
                      "data":"storeId=12345",
                      "mode":"datetime",
                      "initial":"2017-12-25t00:00",
                      "max":"2018-01-24t23:59",
                      "min":"2017-12-25t00:00"
                    },
                    {  
                      "type":"camera",
                      "label":"Camera"
                   }
                ]
                }
            ],
            "imageAspectRatio": "rectangle",
            "imageSize": "cover"
        }
    })
  }
})  

    }
})

app.set('port', (process.env.PORT || 4000))

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})