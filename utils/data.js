export const data = [
  {
    id: 'RAC628A',
    status: 'still',
    name: 'Yutong',
    totalPassengers: 90,
    speed: 75,
    twoWay: true,
    coverage: 0,
    route: {
      name: 'Nyabugogo - Kacyiru',
      origin: 'Nyabugogo',
      destination: 'Kacyiru',
      miles: 90,
      busStops: [
        {
          name: 'Kinamba',
          miles: 20
        },
        {
          name: 'Kacyiru-bus-stop',
          miles: 50
        },
        {
          name: 'Kacyiru-Convention',
          miles: 70
        }
      ]
    }
  },
  {
    id: 'RAD739B',
    status: 'still',
    name: 'Coaster',
    totalPassengers: 30,
    speed: 60,
    twoWay: true,
    coverage: 0,
    route: {
      name: 'Nyabugogo - Kicukiro',
      origin: 'Kicukiro',
      destination: 'Nyabugogo',
      miles: 200,
      busStops: [
        {
          name: 'Kinamba',
          miles: 30
        },
        {
          name: 'Kanogo',
          miles: 80
        },
        {
          name: 'Mironko',
          miles: 100
        },
        {
          name: 'Sonatube',
          miles: 150
        },
      ]
    }
  }
];

export { data as default };
