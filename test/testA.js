
@Service
@Page
class Abc {
}

@Page({
  name: 'aaa',
  entry: 'dfs.js'
})
class Abd {}

console.info(Abc.component);
console.info(Abd.component);
