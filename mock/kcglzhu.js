import Mock from 'mockjs'
Mock.mock('http://localhost:8080/login', 'post', function (option) {
  return Mock.mock({
    "data": {
        "id": 500,
        "rid": 0,
        "username": "admin",
        "mobile": "123",
        "email": "123@qq.com",
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1MTI1NDQyOTksImV4cCI6MTUxMjYzMDY5OX0.eGrsrvwHm-tPsO9r_pxHIQ5i5L1kX9RX444uwnRGaIM"
    },
    "meta": {
        "msg": "登录成功",
        "status": 200
    }
  })
})

// 添加课程Addcourse的post接口
Mock.mock('http://localhost:8080/course/add', 'post', function (option) {
  return Mock.mock({
    
    "meta": {
        "msg": "添加课程成功",
        "status": 200
    }
  })
})

Mock.mock('http://localhost:8080/course/showbycollege', 'post', {
    
    "data|20":[{
        "college|1": [
            '计算机科学学院',
            '马克思学院',
        
        ],
        'ctype|1': [
            '选修课',
            '必修课',
        
        ],
        'cno|1': [
            '110001',
            '110002',
            '110003',
            '110004',
            '110005',
        
        ],
        'cname|1': [
            '大学体育',
            '大学语文',
            '大学高数'
        ],
        'credit|1': [
            '2',
            '3',
            '4'
        ],
        scoreway: "百分制",
        'ratio|1': [
            '60%',
            '70%'
        ]
    }],
    "meta": {
        "msg": "获取成功",
        "status": 200
    },

})

// 修改时表单显示
Mock.mock('http://localhost:8080/course/add', 'post', function (option) {
  return Mock.mock({
    
    "meta": {
        "msg": "添加课程成功",
        "status": 200
    }
  })
})

Mock.mock('http://localhost:8080/course/delete', 'post', function (option) {
  return Mock.mock({
    
    "meta": {
        "msg": "删除课程成功",
        "status": 200
    }
  })
})


// Mock.mock('http://localhost:8080/addcourse/110001', 'post', function (option) {
//   return Mock.mock({
    
//     "meta": {
//         "msg": "添加课程成功",
//         "status": 200
//     }
//   })
// })

// Mock.mock('http://localhost:8080/course/110001', 'get', {
    
//     "data|1":[{
//         "college|1": [
//             '计算机科学学院',
//             '马克思学院',
        
//         ],
//         'ctype|1': [
//             '选修课',
//             '必修课',
        
//         ],
//         'cno':'110001',
//         'cname|1': [
//             '大学体育',
//             '大学语文',
//             '大学高数'
//         ],
//         'credit|1': [
//             '2',
//             '3',
//             '4'
//         ],
//         scoreway: "百分制",
//         'ratio|1': [
//             '60%',
//             '70%'
//         ]
//     }],
// })

// Mock.mock('http://localhost:8080/courseoption', 'get', {
    
//     college: ["计算机科学学院","马克思学院"],
//     "meta": {
//         "msg": "获取成功",
//         "status": 200
//     },

// })

// Mock.mock('http://localhost:8080/courseoption1', 'get', {
    
//     college: ["计算机科学学院","马克思学院"],
//     "data": {
//         "id": 500,
//         "rid": 0,
//         "username": "admin",
//         "mobile": "123",
//         "email": "123@qq.com",
//         "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1MTI1NDQyOTksImV4cCI6MTUxMjYzMDY5OX0.eGrsrvwHm-tPsO9r_pxHIQ5i5L1kX9RX444uwnRGaIM"
//     },
//     "meta": {
//         "msg": "获取成功",
//         "status": 200
//     },

// })