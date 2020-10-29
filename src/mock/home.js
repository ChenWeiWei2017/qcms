// 主页mock数据
const Mock = require('mockjs')

module.exports = [
  {
    url: '/api/v1/home/basedata',
    type: 'get',
    response: () => {
      const orderData = []
      const userData = []
      for (let i = 0; i < 7; i++) {
        orderData.push({
          vue: Mock.Random.float(500, 5000, 0, 2),
          小程序: Mock.Random.float(500, 5000, 0, 2),
          ES6: Mock.Random.float(500, 5000, 0, 2),
          Redis: Mock.Random.float(500, 5000, 0, 2),
          React: Mock.Random.float(500, 5000, 0, 2),
          Springboot: Mock.Random.float(500, 5000, 0, 2)
        })
        userData.push({
          新增用户: Mock.Random.integer(10, 100),
          活跃用户: Mock.Random.integer(100, 800)
        })
      }
      return {
        code: 20000,
        message: 'success',
        data: {
          courseSaleInfo: [
            {
              name: 'ES6',
              todaySaleroom: Mock.Random.float(100, 1000, 0, 2),
              monthSaleroom: Mock.Random.float(3000, 30000, 0, 2),
              totalSaleroom: Mock.Random.float(30000, 100000, 0, 2)
            },
            {
              name: '小程序',
              todaySaleroom: Mock.Random.float(100, 1000, 0, 2),
              monthSaleroom: Mock.Random.float(3000, 30000, 0, 2),
              totalSaleroom: Mock.Random.float(30000, 100000, 0, 2)
            },
            {
              name: 'Vue',
              todaySaleroom: Mock.Random.float(100, 1000, 0, 2),
              monthSaleroom: Mock.Random.float(3000, 30000, 0, 2),
              totalSaleroom: Mock.Random.float(30000, 100000, 0, 2)
            },
            {
              name: 'SpringBoot',
              todaySaleroom: Mock.Random.float(100, 1000, 0, 2),
              monthSaleroom: Mock.Random.float(3000, 30000, 0, 2),
              totalSaleroom: Mock.Random.float(30000, 100000, 0, 2)
            },
            {
              name: 'React',
              todaySaleroom: Mock.Random.float(100, 1000, 0, 2),
              monthSaleroom: Mock.Random.float(3000, 30000, 0, 2),
              totalSaleroom: Mock.Random.float(30000, 100000, 0, 2)
            },
            {
              name: 'Redis',
              todaySaleroom: Mock.Random.float(100, 1000, 0, 2),
              monthSaleroom: Mock.Random.float(3000, 30000, 0, 2),
              totalSaleroom: Mock.Random.float(30000, 100000, 0, 2)
            }
          ],
          orderChart: {
            data: orderData,
            date: [
              '2020-10-01',
              '2020-10-02',
              '2020-10-03',
              '2020-10-04',
              '2020-10-05',
              '2020-10-06',
              '2020-10-07'
            ]
          },
          userChart: {
            data: userData,
            date: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          videoChart: {
            data: [
              {
                name: 'vue',
                value: Mock.Random.integer(500, 5000)
              },
              {
                name: '小程序',
                value: Mock.Random.integer(500, 5000)
              },
              {
                name: 'ES6',
                value: Mock.Random.integer(500, 5000)
              },
              {
                name: 'Redis',
                value: Mock.Random.integer(500, 5000)
              },
              {
                name: 'React',
                value: Mock.Random.integer(500, 5000)
              },
              {
                name: 'Springboot',
                value: Mock.Random.integer(500, 5000)
              }
            ]
          }
        }
      }
    }
  }
]
