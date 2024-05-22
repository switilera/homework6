//Задание № 1 часть 1
interface UserOne {
  id: number;
  name: string;
  email: string;
}

interface Activity {
  userId: number;
  activity: string;
  timestamp: Date;
}

async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Сетевая ошибка");
  }
  return response.json();
}

type PartialUser = Partial<UserOne>;
type ReadonlyActivity = Readonly<Activity>;

async function getUserActivities(userId: number): Promise<Activity[]> {
  return fetchData<Activity[]>(`/api/activities/${userId}`);
}

type ActivitiesReturnType = ReturnType<typeof getUserActivities>;

type AdminPermissions = { canBanUser: boolean };
type BasicPermissions = { canEditProfile: boolean };

type Permissionsone<T extends boolean> = T extends true
  ? AdminPermissions
  : BasicPermissions;

// Задание № 1 Часть № 2

type StringOrNumber = string | number;

function logMessage(message: StringOrNumber): void {
  console.log(message);
}
logMessage("Привет, Проверяющий! ^-^");

function throwError(errorMsg: string): never {
  throw new Error(errorMsg);
}
throwError("Что-то пошло не так! :(");

function isString(value: StringOrNumber): value is string {
  return typeof value === "string";
}

function assertIsNumber(value: any): asserts value is number {
  if (typeof value !== "number") {
    throw new Error("Значение не является числом");
  }
}

function processValue(value: StringOrNumber) {
  if (isString(value)) {
  } else {
    assertIsNumber(value);
  }
}

function processValueTwo(value: StringOrNumber) {
  if (isString(value)) {
    console.log(`String value: ${value.toUpperCase()}`);
  } else {
    console.log(`Number value: ${(value as number).toFixed(2)}`);
  }
}

function processData<T>(data: T): void {
  processData<number>(25);
  processData<string>("Привет,мир!");
}

// Задание № 2 Тут возможно будут ошибки :(
interface ResponseTwo<T> {
  data: T;
  status: number;
}

function createResponseTwo<T>(data: T, status: number): ResponseTwo<T> {
  return {
    data,
    status,
  };
}

const numericResponseTwo = createResponseTwo<number[]>([1, 2, 3, 4, 5], 100);

type UserTwo = {
  name: string;
  age: number;
};

const userTwoResponseTwo = createResponseTwo<UserTwo>(
  { name: "Valeriya", age: 25 },
  100
);

//Задание № 3
type Car = {
  company: string;
  model: string;
  year: number;
};

type Bike = {
  company: string;
  type: "road" | "mountain";
};

function isCar(vehicle: any): vehicle is Car {
  return "year" in vehicle;
}

function printVehicleInfo(vehicle: Car | Bike) {
  if (isCar(vehicle)) {
    console.log(`Car: ${vehicle.company} ${vehicle.model} ${vehicle.year}`);
  } else {
    console.log(`Bike: ${vehicle.company} ${vehicle.type}`);
  }
}

// Задание № 4

interface Employee {
  id: number;
  name: string;
  department: string;
  email: string;
}

type PartialEmployee = Partial<Employee>;
type ReadonlyEmployee = Readonly<Employee>;

function printEmployeeInfo(employee: PartialEmployee) {
  console.log(`Employee Information:`);
  console.log(`ID: ${employee.id ?? "Не указан"}`);
  console.log(`Name: ${employee.name ?? "Не указан"}`);
  console.log(`Department: ${employee.department ?? "Не указан"}`);
  console.log(`Email: ${employee.email ?? "Не указан"}`);
}

//Задание № 5

interface UserFive {
  id: number;
  name: string;
  email: string;
  age: number;
}

type UserNameType = UserFive["name"];

type UserFieldsToBoolean = {
  [Key in keyof UserFive]: boolean;
};

function getUserFieldType<Key extends keyof UserFive>(key: Key): UserFive[Key] {
  return null as any;
}

const ageType = getUserFieldType("age");
const nameType = getUserFieldType("name");

// Задание № 6
interface Identifiable {
  id: number;
}

function findById<T extends Identifiable>(
  items: T[],
  id: number
): T | undefined {
  return items.find((item) => item.id === id);
}

interface UserSix extends Identifiable {
  name: string;
  email: string;
  age: number;
}

const userssix: UserSix[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
];
const usersix = findById(userssix, 1);

// Задание № 7
interface UserSeven {
  id: number;
  name: string;
  age: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Book {
  isbn: string;
  title: string;
  author: string;
}

function findInArray<T extends object, K extends keyof T>(
  items: T[],
  key: K,
  value: T[K] | undefined
): T | undefined {
  return items.find((item) => {
    if (key in item) {
      return item[key] === value;
    }
    return false;
  });
}

function findByKeys<T extends object>(
  items: T[],
  criteria: Partial<T>
): T | undefined {
  return items.find((item) => {
    for (const key in criteria) {
      if (key in item && item[key] !== criteria[key]) {
        return false;
      }
    }
    return true;
  });
}

const userseven: UserSeven[] = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
];

const products: Product[] = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Smartphone", price: 500 },
];

const books: Book[] = [
  { isbn: "12345", title: "The TypeScript Handbook", author: "Someone" },
  { isbn: "67890", title: "Learning TypeScript", author: "Another One" },
];

const foundUser = findInArray(userseven, "name", "Alice");
console.log("Found User:", foundUser);

const foundProduct = findInArray(products, "price", 500);
console.log("Found Product:", foundProduct);

const foundBook = findInArray(books, "author", "Another One");
console.log("Found Book:", foundBook);

// Задание № 8
interface Person {
  name: string;
  age: number;
}

interface Adult {
  fullName: string;
  age: number;
}

function mapandfilter<T, U>(
  items: T[],
  transform: (item: T) => U,
  filter: (item: U) => boolean
): U[] {
  const transformedItems = items.map(transform);
  const filteredItems = transformedItems.filter(filter);
  return filteredItems;
}

const people: Person[] = [
  { name: "Alice", age: 24 },
  { name: "Bob", age: 17 },
  { name: "Charlie", age: 32 },
];

const adults: Adult[] = mapandfilter(
  people,
  (person) => ({ fullName: person.name, age: person.age }),
  (adult) => adult.age >= 18
);

console.log(adults);
[
  { fullName: "Alice", age: 24 },
  { fullName: "Charlie", age: 32 },
];

/* Вопрос №1
Как изменится функция, если необходимо добавить возможность изменения критерия сортировки? 

Ответ разберу на примере,
Функция до:
function sortArray(arr: number[]): number[] {
    return arr.sort((с, v) => c - v);
}

После :
function sortArray(arr: number[], criteria: (с: number, v: number) => number): number[] {
    return arr.sort(criteria);
}
Пример с массивом:
const array = [4, 2, 5, 1, 3];
const ascSortedArray = sortArray(array, (a, b) => a - b);
const descSortedArray = sortArray(array, (a, b) => b - a);

console.log(ascSortedArray); // по возрастанию
console.log(descSortedArray); // по убыванию
*/

// Вопрос №2 Могут ли типы T и U быть полностью разными или должны иметь общие характеристики? Объясните ваш ответ.
/* Ответ: типы T и U могут быть полностью разными и могут не иметь общие характеристики. 
Пример с двумя типами:
 
function combine<T, U>(arg1: T, arg2: U): string {
    return `${arg1.toString()} ${arg2.toString()}`;
}

const result = combine(10, 'hello');
В данном примере тип T и тип U разные (number и string), но при этом они могут быть использованы вместе в рамках одной функции.

язык TypeScript имеет возможность использования обобщенных типов, которые могут быть совершенно разными друг от друга и не иметь общих характеристик.
*/
