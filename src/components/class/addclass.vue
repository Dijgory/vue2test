allrightslist: [
                    {
                        id: 0,
                        rolename: "普通管理员",
                        roledesc: "普通管理员,无分配权限",
                        children: [
                            {
                                id: 11,
                                authname: '基础信息',
                                children: [
                                    {
                                        id: 111,
                                        authname: '课程管理',
                                        children: [
                                            {
                                                id: 1111,
                                                authname: '增加课程'
                                            },
                                            {
                                                id: 1112,
                                                authname: '删除课程'
                                            },
                                            {
                                                id: 1113,
                                                authname: '修改课程'
                                            },
                                            {
                                              id: 1114,
                                              authname: '课程列表'
                                            },
                                        ]
                                    },
                                    {
                                        id: 112,
                                        authname: '班级管理',
                                        children: [
                                            {
                                                id: 1121,
                                                authname: '增加班级'
                                            },
                                            {
                                                id: 1122,
                                                authname: '删除班级'
                                            },
                                            {
                                                id: 1123,
                                                authname: '修改班级'
                                            },
                                            {
                                                id: 1124,
                                                authname: '查看班级'
                                            },
                                            {
                                                id: 1125,
                                                authname: '班级列表'
                                            },
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 12,
                                authname: '档案管理',
                                children: [
                                    {
                                        id: 121,
                                        authname: '教师管理',
                                        children: [
                                            {
                                                id: 1211,
                                                authname: '增加教师',
                                            },
                                            {
                                                id: 1212,
                                                authname: '删除教师',
                                            },
                                            {
                                                id: 1213,
                                                authname: '修改教师'
                                            },
                                            {
                                                id: 1214,
                                                authname: '教师列表'
                                            },
                                        ]
                                    },
                                    {
                                        id: 122,
                                        authname: '教学分配'
                                    },
                                    {
                                        id: 123,
                                        authname: '学生管理',
                                        children: [
                                            {
                                                id: 1231,
                                                authname: '增加学生',
                                            },
                                            {
                                                id: 1232,
                                                authname: '删除学生'
                                            },
                                            {
                                                id: 1233,
                                                authname: '修改学生'
                                            },
                                            {
                                              id: 1234,
                                              authname: '学生列表'
                                            },
                                        ]
                                    }
                                ]
                            },
                            {
                                id: 13,
                                authname: '申请信息',
                                children: [
                                    {
                                        id: 131,
                                        authname: '调停课申请',
                                        children:[
                                            {
                                              id: 1311,
                                              authname: '调停课申请列表',
                                            },
                                            {
                                              id: 1312,
                                              authname: '调停课申请详情',
                                            },
                                        ]
                                    },
                                    {
                                      id: 132,
                                      authname: '申请教室',
                                      children:[
                                          {
                                            id: 1321,
                                            authname: '申请教室列表',
                                          },
                                          {
                                            id: 1322,
                                            authname: '教室申请详情',
                                          },
                                      ]
                                    }
                                ]
                            },
                        ]
                    },
                    {
                        id: 1,
                        rolename: "教师",
                        roledesc: "教师角色",
                        children: [
                            {
                              id: 14,
                              authname: '开课',
                              children: [
                                  {
                                      id: 141,
                                      authname: '我的行课计划',           
                                  },
                                  {
                                    id: 142,
                                    authname: '我的行课计划详情',                               
                                  }
                              ]
                            },
                            {
                              id: 15,
                              authname: '行课',
                              children: [
                                  {
                                    id: 151,
                                    authname: '课表查询',
                                    children: [
                                        {
                                          id: 1511,
                                          authname: '教师学期课表',
                                        },
                                        {
                                          id: 1512,
                                          authname: '我的周课表(教师)',
                                        },
                                    ]           
                                  },
                                  {
                                    id: 152,
                                    authname: '调停课管理',   
                                    children: [
                                        {
                                          id: 1521,
                                          authname: '调停课管理列表',
                                        },
                                        {
                                          id: 1522,
                                          authname: '调停课申请编辑',
                                        },
                                    ]                              
                                  },
                                  {
                                    id: 153,
                                    authname: '申请教室',    
                                    children: [
                                        {
                                          id: 1531,
                                          authname: '申请教室管理',
                                        },
                                        {
                                          id: 1532,
                                          authname: '申请教室编辑',
                                        },
                                    ]                           
                                  },
                              ]
                            },
                            {
                              id: 16,
                              authname: '成绩',
                              children: [
                                  {
                                      id: 161,
                                      authname: '成绩册列表',           
                                  },
                                  {
                                    id: 162,
                                    authname: '学生名册',                               
                                  }
                              ]
                            },
                        ]

                    },
                    {
                        id: 2,
                        rolename: '学生',
                        roledesc: '学生角色',
                        children: [
                            {
                              id: 17,
                              authname: '行课',
                              children: [
                                  {
                                      id: 171,
                                      authname: '学生学期课表',           
                                  },
                                  {
                                    id: 172,
                                    authname: '我的周课表(学生)',                               
                                  }
                              ]
                            },
                            {
                              id: 18,
                              authname: '成绩',
                              children: [
                                  {
                                      id: 181,
                                      authname: '成绩查询',           
                                  },
                                  {
                                    id: 182,
                                    authname: '教学评估',                               
                                  }
                              ]
                            },
                            {
                              id: 19,
                              authname: '学生个人信息',
                            },
                            {
                              id: 20,
                              authname: '查看所有用户',
                            },
                            {
                              id: 21,
                              authname: '查找用户',
                            },
                            {
                              id: 22,
                              authname: '添加用户',
                            },
                            {
                              id: 23,
                              authname: '修改用户',
                            },
                            {
                              id: 24,
                              authname: '删除用户',
                            },
                            {
                              id: 25,
                              authname: '查看所有角色',
                            },
                            {
                              id: 26,
                              authname: '添加角色',
                            },
                            {
                              id: 27,
                              authname: '删除角色',
                            },
                            {
                              id: 28,
                              authname: '查看所有权限',
                            },
                            {
                              id: 29,
                              authname: '查看角色权限',
                            },
                            {
                              id: 30,
                              authname: '添加角色权限',
                            },
                            {
                              id: 31,
                              authname: '删除角色权限',
                            },
                        ]
                    }
                ],







{
  form:{
    college:'',
    classno:'',
    major:'',
    grade:'',
    semester:'',
    num:'',
  },
  table:[{
    college:'',
    ctype:'',
    cno:'',
    cname:'',
    credit:'',
    scoreway:'',
    ratio:'',
  }]
}