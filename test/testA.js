
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


console.info(Abc.$$component);
console.info(Abd.$$component);
