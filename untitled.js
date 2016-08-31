let objs = [
  {name: 'Melanie'},
  {name: 'Thees'},
  {name: 'Nils'},
  {name: 'Tillmann'}
]

console.log(objs);

let target  = objs.find((el) => el.name === 'Nils');
let index   = objs.indexOf(target);
objs.splice(index, 1);

console.log(objs)

target  = objs.find((el) => el.name === 'Melanie');
index   = objs.indexOf(target);

objs.splice(index, 1);

console.log(objs);
