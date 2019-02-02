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
    client.replyMessage(event.replyToken, 
      {
        "type": "template",
        "altText": "This is a buttons template",
        "template": {
            "type": "buttons",
            "thumbnailImageUrl": "http://3.bp.blogspot.com/_Y8A7lRkpP78/TAejrGmJaJI/AAAAAAAAASg/jko_QhaKm98/s1600/golden+retriever+pup.jpg",
            "imageAspectRatio": "rectangle",
            "imageSize": "cover",
            "imageBackgroundColor": "#E9A0EA",
            "title": "Karn",
            "text": "Thanaphat Inkum",
            "defaultAction": {
                "type": "uri",
                "label": "View detail",
                "uri": "http://google.com/"
            },
            "actions": [
                {
                  "type": "postback",
                  "label": "Buy",
                  "data": "action=buy&itemid=123"
                },
                {
                  "type": "message",
                  "label": "Add to cart",
                  "text": "no no no"
                },
                {
                  "type": "uri",
                  "label": "View detail",
                  "uri": "http://google.com"
                }
            ]
        }
      })   

    }
})

app.set('port', (process.env.PORT || 4000))

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})