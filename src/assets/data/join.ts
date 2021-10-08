import { ViewStyle } from 'react-native';
import { Colors } from 'styled-components';

export const likeText: likeTextElement[] = [
  {
    text: '포테이토 피자',
    radius: 70,
    id: '6915261',
    color: 'vegetable',
    styles: { top: '60px', left: '-10px' },
  },
  {
    text: '제육볶음',
    radius: 45,
    id: '6915173',
    color: 'citrus',
    styles: { top: '140px', left: '130px' },
  },
  {
    text: '',
    radius: 18,
    id: null,
    color: 'carrot',
    styles: { top: '70px', left: '140px' },
  },
  {
    text: '소시지 볶음',
    radius: 70,
    id: '6914898',
    color: 'deepYellow',
    styles: { top: '10px', left: '190px' },
  },
  {
    text: '',
    radius: 12,
    id: null,
    color: 'carrot',
    styles: { top: '40px', left: '340px' },
  },
  {
    text: '옥수수전',
    radius: 50,
    id: '6917466',
    color: 'vegetable',
    styles: { top: '160px', left: '275px' },
  },
  {
    text: '꼬막무침',
    radius: 60,
    id: '6906091',
    color: 'carrot',
    styles: { top: '60px', left: '350px' },
  },
  {
    text: '',
    radius: 20,
    id: null,
    color: 'tableGray',
    styles: { top: '55px', left: '475px' },
  },
  {
    text: '꼬치구이',
    radius: 50,
    id: '6916717',
    color: 'vegetable',
    styles: { top: '110px', left: '480px' },
  },
  {
    text: '꽃게탕',
    radius: 40,
    id: '6920423',
    color: 'carrot',
    styles: { top: '215px', left: '25px' },
  },
  {
    text: '',
    radius: 10,
    id: null,
    color: 'citrus',
    styles: { top: '210px', left: '105px' },
  },
  {
    text: '아보카도 연어덮밥',
    radius: 90,
    id: '6921736',
    color: 'carrot',
    styles: { top: '255px', left: '90px' },
  },
  {
    text: '',
    radius: 20,
    id: null,
    color: 'deepGreen',
    styles: { top: '210px', left: '220px' },
  },
  {
    text: '깻잎무침',
    radius: 40,
    id: '6915298',
    color: 'deepYellow',
    styles: { top: '275px', left: '290px' },
  },
  {
    text: '',
    radius: 25,
    id: null,
    color: 'vegetable',
    styles: { top: '370px', left: '285px' },
  },
  {
    text: '어묵볶음',
    radius: 50,
    id: '6914478',
    color: 'vegetable',
    styles: { top: '295px', left: '385px' },
  },
  {
    text: '',
    radius: 12,
    id: null,
    color: 'deepGreen',
    styles: { top: '260px', left: '370px' },
  },
  {
    text: '호박죽',
    radius: 45,
    id: '6926163',
    color: 'deepYellow',
    styles: { top: '190px', left: '400px' },
  },

  {
    text: '마파두부',
    radius: 65,
    id: '6913662',
    color: 'deepOrange',
    styles: { top: '225px', left: '495px' },
  },
  {
    text: '회',
    radius: 30,
    id: '1234',
    color: 'deepYellow',
    styles: { top: '305px', left: '10px' },
  },
  {
    text: '',
    radius: 20,
    id: null,
    color: 'deepYellow',
    styles: { top: '195px', left: '-20px' },
  },
];

interface likeTextElement {
  text: string;
  radius: number;
  id: string | null;
  color: Colors;
  styles: ViewStyle;
}
