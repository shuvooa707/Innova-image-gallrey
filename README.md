## Installation
#### Step 1
*Clone the Repo*
```sh
git clone https://github.com/shuvooa707/Innova-image-gallrey.git
```
#### Step 2
*Prepare .env file*
```sh
cp .env.example .env
```
#### Step 3
*Install composer packages*
```sh
composer install
```
#### Step 4
*Install npm packages*
```sh
npm install
```
#### Step 5
*Generate Key*
```sh
php artisan key:generate
```
#### Step 6
*Configure Database in .env file*
```sh
DB_CONNECTION=${YOUR_DATABASE_DIALECT}
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=${YOUR_DATABASE_NAME}
DB_USERNAME=${YOUR_DATABASE_USERNAME}
DB_PASSWORD=${YOUR_DATABASE_PASSWORD}
```

#### Step 7
*migrate && seed*
```sh
php artisan migrate:fresh --seed
```
#### Step 8
***Finally Run The Application***
```sh
php artisan serve
```
