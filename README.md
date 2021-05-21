# APIs

```json
{
    "paths": {
        "/place": {
            "get": {
                "description": "Tìm kiếm địa điểm",
                "produces": "applicaion/json",
                "parameters": [
                    {
                        "in": "query",
                        "name": "q",
                        "description": "Từ tìm kiếm"
                    },
                    {
                        "in": "query",
                        "name": "latitude",
                        "description": "Vĩ độ"
                    },
                    {
                        "in": "query",
                        "name": "longitude",
                        "description": "Kinh độ"
                    },
                    {
                        "in": "query",
                        "name": "maxDistance",
                        "description": "Giới hạn khoảng cách tìm kiếm (đơn vị kilometer), tính từ cặp (kinh độ, vĩ độ) cung cấp trên"
                    }
                ]
            }
        },
        "/rate": {
            "post": {
                "description": "Đánh giá địa điểm",
                "produces": "applicaion/json",
                "parameters": [
                    {
                        "in": "body",
                        "name": "placeId",
                        "description": "ObjectId của địa điểm"
                    },
                    {
                        "in": "body",
                        "name": "deviceId",
                        "description": "Unique device id"
                    },
                    {
                        "in": "body",
                        "name": "rate",
                        "description": "Điểm đánh giá"
                    }
                ]
            }
        }
    }
}
```
