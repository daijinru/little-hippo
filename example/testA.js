
@Service()
@Page({
  name: 'Abc'
})
class Abc {
}

@Page({
  name: 'Abd',
})
@Service()
class Abd  {
  static main() {}
}

@Page({
  name:'ABE',
})
class ABE {
}


console.info(Abc.$$component);
console.info(Abd.$$component);
console.info(ABE.$$component);
