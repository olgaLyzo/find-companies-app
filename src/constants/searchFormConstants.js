const DEV_MODE = import.meta.env.DEV;
//Раскомментить в конце разработки и удалить DEV_MODE и Datainit под ним!!!!!!!!!!!!!!
// const dataInit = {
//   inn: '',
//   tone: 'Любая',
//   documentCount: '',
//   dateStart: '',
//   dateEnd: ''
// };
export const dataInit = {
    inn: DEV_MODE ? '77 360 500 03' : '',
    tone: 'Любая',
    documentCount: DEV_MODE ? '10' : '',
    dateStart: DEV_MODE ? '01.01.2022' : '',
    dateEnd: DEV_MODE ? '21.07.2026' : '',
};
export const errorsInit = {
    inn: false,
    tone: false,
    documentCount: false,
    dateStart: false,
    dateEnd: false,
};
