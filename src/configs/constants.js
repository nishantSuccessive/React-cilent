import { trainees } from '../pages/Trainee/data';

export const PUBLIC_IMAGE_FOLDER = '/images/';
export const DEFAULT_BANNER_IMAGE = 'banners/default.png';
export const DropDownValues = [{ label: 'Cricket', value: 1 }, { label: 'Football', value: 2 }];
export const Cricket = [{ label: 'Wicketkeeper', value: 1 }, { label: 'AllRounder', value: 2 }, { label: 'Batsman', value: 3 }, { label: 'Bowler', value: 4 }];
export const Football = [{ label: 'Striker', value: 1 }, { label: 'Defender', value: 2 }, { label: 'GoalKeeper', value: 3 }];

let id = 0;
const createData = (name, email) => {
  id += 1;
  return { id, name, email };
};

export const rows = trainees.map(element => createData(element.name, element.email));
