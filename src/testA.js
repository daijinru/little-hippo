
import babel2 from './test2.js';

babel2();
function decorator(target) {
 target.c = true;
}

@decorator
class Abc {
}
console.info(Abc.c);

