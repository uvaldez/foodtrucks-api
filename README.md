# foodtrucks-api

## Documentation
https://foodtrucks-docs.onrender.com

## Getting Started

Clone [API repo](https://github.com/uvaldez/foodtrucks-api) from github, use the following command:

```bash
git clone https://github.com/uvaldez/foodtrucks-api.git foodtrucks-api
```

Move to `foodtrucks-api` directory
```bash
cd foodtrucks-api
```

Install dependencies
```bash
npm install
```

Run project
```bash
node app.js
```
API should be running on http://localhost:8080/

## Endpoints
There are 3 main endpoints, all of them live inside `app.js` file:

### GET /food-trucks
this endpoint returns all food trucks and it supports pagination.

Sample CURL:
```
curl --location 'https://foodtrucks-api-04qa.onrender.com/food-trucks?limit=1&offset=0'
```

Sample response:
```
[
    {
        "objectid": "735318",
        "applicant": "Ziaurehman Amini",
        "facilitytype": "Push Cart",
        "cnn": "30727000",
        "locationdescription": "MARKET ST: DRUMM ST intersection",
        "address": "5 THE EMBARCADERO",
        "blocklot": "0234017",
        "block": "0234",
        "lot": "017",
        "permit": "15MFF-0159",
        "status": "REQUESTED",
        "x": "6013916.72",
        "y": "2117244.027",
        "latitude": "37.794331003246846",
        "longitude": "-122.39581105302317",
        "schedule": "http://bsm.sfdpw.org/PermitsTracker/reports/report.aspx?title=schedule&report=rptSchedule&params=permit=15MFF-0159&ExportPDF=1&Filename=15MFF-0159_schedule.pdf",
        "received": "20151231",
        "priorpermit": "0",
        "expirationdate": "2016-03-15T00:00:00.000",
        "location": {
            "latitude": "37.794331003246846",
            "longitude": "-122.39581105302317",
            "human_address": "{\"address\": \"\", \"city\": \"\", \"state\": \"\", \"zip\": \"\"}"
        },
        ":id": "row-iuec-rtpx-37j2"
    }
]
```

### GET /food-trucks/:id
this endpoint returns food truck by id

Sample CURL:
```
curl --location 'https://foodtrucks-api-04qa.onrender.com/food-trucks/735318'
```

Sample response:
```
  {
      "objectid": "735318",
      "applicant": "Ziaurehman Amini",
      "facilitytype": "Push Cart",
      "cnn": "30727000",
      "locationdescription": "MARKET ST: DRUMM ST intersection",
      "address": "5 THE EMBARCADERO",
      "blocklot": "0234017",
      "block": "0234",
      "lot": "017",
      "permit": "15MFF-0159",
      "status": "REQUESTED",
      "x": "6013916.72",
      "y": "2117244.027",
      "latitude": "37.794331003246846",
      "longitude": "-122.39581105302317",
      "schedule": "http://bsm.sfdpw.org/PermitsTracker/reports/report.aspx?title=schedule&report=rptSchedule&params=permit=15MFF-0159&ExportPDF=1&Filename=15MFF-0159_schedule.pdf",
      "received": "20151231",
      "priorpermit": "0",
      "expirationdate": "2016-03-15T00:00:00.000",
      "location": {
          "latitude": "37.794331003246846",
          "longitude": "-122.39581105302317",
          "human_address": "{\"address\": \"\", \"city\": \"\", \"state\": \"\", \"zip\": \"\"}"
      },
      ":id": "row-iuec-rtpx-37j2"
  }
```


### POST /food-trucks/search
this endpoint returns food truck by food items or food truck based on `searchValue`

Sample CURL:
```
curl --location 'https://foodtrucks-api-04qa.onrender.com/food-trucks/search' \
--header 'Content-Type: application/json' \
--data '{
    "searchValue": "taco"
}'
```

Sample response:
```
[
    {
        "objectid": "1343454",
        "applicant": "Esmeli Catering",
        "facilitytype": "Truck",
        "cnn": "7022000",
        "locationdescription": "HOOPER ST: 07TH ST to 08TH ST (100 - 199)",
        "address": "Assessors Block /Lot",
        "permit": "19MFF-00110",
        "status": "REQUESTED",
        "fooditems": "tacos: burritos: quesadilla: tortas sodas",
        "latitude": "0",
        "longitude": "0",
        "schedule": "http://bsm.sfdpw.org/PermitsTracker/reports/report.aspx?title=schedule&report=rptSchedule&params=permit=19MFF-00110&ExportPDF=1&Filename=19MFF-00110_schedule.pdf",
        "received": "20190731",
        "priorpermit": "0",
        "location": {
            "latitude": "0.0",
            "longitude": "0.0",
            "human_address": "{\"address\": \"\", \"city\": \"\", \"state\": \"\", \"zip\": \"\"}"
        },
        ":id": "row-cbvt~kvip-bczv"
    },
    {
        "objectid": "1334819",
        "applicant": "tacos y pupusas los trinos",
        "cnn": "9158000",
        "locationdescription": "MISSION ST: AVALON AVE to COTTER ST (4368 - 4439)",
        "address": "4384 MISSION ST",
        "blocklot": "6798004",
        "block": "6798",
        "lot": "004",
        "permit": "19MFF-00048",
        "status": "REQUESTED",
        "x": "6002680.03",
        "y": "2093158.531",
        "latitude": "37.727566537591706",
        "longitude": "-122.4329697019889",
        "schedule": "http://bsm.sfdpw.org/PermitsTracker/reports/report.aspx?title=schedule&report=rptSchedule&params=permit=19MFF-00048&ExportPDF=1&Filename=19MFF-00048_schedule.pdf",
        "received": "20190703",
        "priorpermit": "0",
        "location": {
            "latitude": "37.727566537591706",
            "longitude": "-122.4329697019889",
            "human_address": "{\"address\": \"\", \"city\": \"\", \"state\": \"\", \"zip\": \"\"}"
        },
        ":id": "row-unk9_aa48_dmwb"
    }
  ]
```

