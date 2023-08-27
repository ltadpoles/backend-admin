const POOL = {
  max: 5,
  min: 0,
  acquire: 3000,
  idle: 10000
}

export const DBINIT = {
  host: 'localhost',
  dialect: 'mysql',
  pool: POOL
}

export const CONFIG = {
  PORT: process.env.port || '3000',
  SECRETKEY: 'backend_admin_ltadpole',
  PUBLICPATH: '/api', // 不需要验证 token 的接口
  PUBLICKEY: '-----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBALbCYVZfHRyy4tSFGPts0VmJu5biGYb4U53tENHYDhs9LRTejo7rQIuy\nFZ6KKM8rDKqSDV+Cv0kfta3TaLmAQsNxoyDM94VKMywGehTCoFnQPbE1BpsbwpA2\nixDoZk4a2vWTdFObnwHIGYRMv8Hn8TnaYR205tQMsE3ncPOmwDEhAgMBAAE=\n-----END RSA PUBLIC KEY-----\n',
  PRIVATEKEY: '-----BEGIN RSA PRIVATE KEY-----\nMIICXAIBAAKBgQC2wmFWXx0csuLUhRj7bNFZibuW4hmG+FOd7RDR2A4bPS0U3o6O\n60CLshWeiijPKwyqkg1fgr9JH7Wt02i5gELDcaMgzPeFSjMsBnoUwqBZ0D2xNQab\nG8KQNosQ6GZOGtr1k3RTm58ByBmETL/B5/E52mEdtObUDLBN53DzpsAxIQIDAQAB\nAoGALCfGkLGmPPrTZvlJUeW2puVqF0hFVqDEwxE10R1cOySKsdIbq1gXXikGpClJ\nNtR12Pg0lvDl+mrY4EiFstvURS+4JcW3Ugp9TUXriGy3IgBmqgSX6h+v7PG5J44F\n24NbJTQtosLBto/u8F9Fa9VxDGRkARXmGMmlwrk45yI9M4ECQQDY9ONJIllPK7y/\nDC7GwPB2HqLelQu4JYlp2L8H9CIkpwTGD/KON09cTHORaIoJ5i+yb+Ak2pv2tj9p\n36UN5QQpAkEA16YJCWSVZbbkDhXgKNOAH64qg418gvpebzaNIO60AoMWviYFaEKW\nOvM/pa3kTGwUxWjj5eEa040D7ujVWlikOQJAW+hp/IpbkSlzHO/ZRQNpGnDiCC7V\ntx3Xt4pFauYmLKbAY/NPiqWtrekJMDk7+POVkx7HsnUViw8rj/tZHai9+QJAdoem\nc+k7TJsIIs3XVdlalQ8wAvrjs0JWYZ6EV9OcUb0n5QAU/MeMt344P6Ki13aYvCD5\nEsN18U2TGeAUVQJf0QJBAJOM9cKYA9G0EkJ+L38OeP9j5ygKS79IgT2NwYImqSUZ\nTcYGDvky8vPE80HDW9VEZIqDwk0lPFKjjKeAm2U1I7g=\n-----END RSA PRIVATE KEY-----\n'
}