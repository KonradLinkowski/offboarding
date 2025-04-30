import { http, HttpResponse } from 'msw';

// https://github.com/mswjs/msw/issues/397#issuecomment-751230924
const api = (path: string) => new URL(path, 'http://localhost:4200').toString();

export const handlers = [
  http.get(api('/employees'), () => {
    return HttpResponse.json([
      {
        id: 'vvv1323',
        name: 'John Doe',
        department: 'Engineering',
        status: 'ACTIVE',
        email: 'some.email@wp.pl',
        equipments: [
          {
            id: 'aaa123456',
            name: 'Macbook air',
          },
          {
            id: 'aaa123456',
            name: 'Magic Mouse',
          },
        ],
      },
    ]);
  }),
  http.get(api('/employees/:id'), () => {
    return HttpResponse.json({
      id: 'vvv1323',
      name: 'John Doe',
      department: 'Engineering',
      email: 'some.email@wp.pl',
      status: 'OFFBOARDED',
      equipments: [
        {
          id: 'aaa123456',
          name: 'Macbook air',
        },
        {
          id: 'aaa123456',
          name: 'Magic Mouse',
        },
      ],
    });
  }),
  http.post(api('/employees/:id/offboard'), () => {
    return HttpResponse.json({
      address: {
        streetLine1: 'Kocmyrzowska 1',
        country: 'Poland',
        postalCode: '13-231',
        receiver: 'Stefan Batory',
      },
      notes: 'some text',
      phone: '+48123123123',
      email: 'some.email@gmail.com',
    });
  }),
];
