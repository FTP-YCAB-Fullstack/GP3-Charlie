# GP3 - Charlie
Pada grup project 3 ini kami ingin membuat sebuah Backend aplikasi yang berfokus pada lingkungan sekolah yaitu pengelompokan dan pengolahan nilai siswa, tujuan dari aplikasi yang kita buat ini adalah untuk memudahkan guru dan pegawai sekolah untuk memantau dan menyimpan nilai siswa siswi dari sekolah tersebut yang bentuk akhirnya berupa sebuah raport yang berisikan nama siswa, kelas siswa, serta nilai dari siswa tersebut.

Dengan beranggotakan Wira Sebagai ketua serta Iqbal dan Yusril sebagai anggota, kita harap dalam grup project ini dapat kita selesaikan tepat waktu.

Rancangan ERD bisa di lihat melalui link berikut :
https://1drv.ms/u/s!AvyjxC2Xxt29mgNKKwQFOMBaqZBu?e=khSRsb


# USER

+ Login User
   - Endpoint : /users
   - Method : POST
   - request : body
   #
    ```
    {
      email : "admin@gmail.com",
      password : "admin123",
    }
    ```
   #
   #### Respon Success
   Ini adalah tampilan ketika anda dapat melakukan login
   
    ```{
    "message": "Login Berhasil, Selamat Datang admin",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTYzMzI3NTMxMn0.a4iRMrlR9KNLxCXu9ZKROVm-1NkxZNNha1WeQes6s1U",
    "payload": {
        "userId": 1,
        "role": "admin"
    }
    ```
#
+ Register User
   - Endpoint : /users
   - Method : POST
   - request : body
   #
    ```
    {
      name : "Yusril"
      email : "yusril@gmail.com",
      password : "123456",
    }
    ```
   #
   #### Respon Success Status Code (201)
   Berikut adalah gambaran apabila data berhasil di buat.
   
    ```{
    {
    "message": "user created",
    "teacher": {
        "Nama_Guru": "Yusril",
        "ID": 2,
        "email": "yusril@gmail.com",
        "Role": "teacher"
    }
    ```
   #
   #### Error Response
   Error dikarenakan akibat data yang di inputkan sudah tersedia di dalam database sehingga ketika melakukan registrasi datanya akan conflict.
         
   
    ```{
    {
    "message": "email already exist"
    }
    ```

+ GET All Users
   - Endpoint : /users
   - Method : GET

   #
   #### Respon Success Status Code (201)
   Berikut adalah tampilan apabila user berhasil menampilkan semua data menggunakan Method GET.
   
    ```{
    {
    "users": [
        {
            "id": 1,
            "name": "admin",
            "email": "admin@gmail.com",
            "role": "admin",
            "Class": null
        },
        {
            "id": 2,
            "name": "Yusril",
            "email": "yusril@gmail.com",
            "role": "teacher",
            "Class": null
        }
    ],
    "currentUser": {
        "id": 1,
        "name": "admin",
        "email": "admin@gmail.com",
        "role": "admin",
        "Class": null
    }
    ```
   #
   #### Error Response
   Error dikarenakan akibat data yang di inputkan belum dimasukan ke kelas manapun.
         
    ```{
    {
    "message": "Guru tidak terdaftar di kelas manapun"
   }
    ```

   #
   # CLASS

+ Create Class
   - Endpoint : /class
   - Method : POST
   - request : body
   #
    ```
    {
      name : Kelas 1 A,
      Teacher : 2
    }
    ```
   #
   #### Respon Success
   Ini adalah tampilan ketika anda dapat membuat class
   
    ```{
    {
    "message": "class created",
    "class_data": {
        "id": 1,
        "name": "Kelas 1 A",
        "Teacher": 2,
        "updatedAt": "2021-10-03T16:56:08.287Z",
        "createdAt": "2021-10-03T16:56:08.287Z"
    }
    }
    ```
    #
   #### Error Response
   Error ini ditemukan apabial terdapat id teacher yang tidak ada di dalam database.
   
    ```{
    {
    "message": "Cannot add or update a child row: a foreign key constraint fails (`school`.`classes`, CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`Teacher`) REFERENCES `users` (`id`))"
   }
    ```
   #
 + GET Class
   - Endpoint : /class
   - Method : GET
   
   #
   #### Respon Success
   Ini adalah tampilan ketika anda dapat melakukan login
   
    ```{
    
    {
    "message": "OK",
    "class": [
        {
            "id": 1,
            "name": "Kelas 1 A",
            "Teacher": 2,
            "createdAt": "2021-10-03T16:56:08.000Z",
            "updatedAt": "2021-10-03T16:56:08.000Z",
            "Students": [],
            "User": {
                "id": 2,
                "name": "Yusril",
                "email": "yusril@gmail.com",
                "password": "$2a$10$HfqsQ8hUdCinRqZ/d1IwXuRy5FOqGev8Gg3ixYzCkz1EWkRwO6/pm",
                "role": "teacher",
                "createdAt": "2021-10-03T16:31:46.000Z",
                "updatedAt": "2021-10-03T16:31:46.000Z"
            }
        }
    ],
    "currentUser": {
        "id": 2,
        "name": "Yusril",
        "email": "yusril@gmail.com",
        "role": "teacher",
        "Class": {
            "id": 1,
            "name": "Kelas 1 A",
            "Teacher": 2
        }
    }
   }
    ```
   #
   #### Error Response
   Error ini ditemukan apabial belum ada data di dalam database Class.
   
    ```{
    {
    message:"Tidak ada kelas yang terdaftar"
   }
    ```

+ DELETE Class
   - Endpoint : /class/:id
   - Method : Delete
   
   #
   #### Respon Success
   Akan ada sebuah pesan sukses apabila anda berhasil menghapus data kelas di database.
   
    ```{
   {
    "status": "Class Deleted"
   }
    ```
   #
   #### Error Response
   Error ini ditemukan apabila data belum di buat atau tidak ada pada database Class.
   
    ```{
    {
    "message": "Kelas tidak ditemukan"
   }
    ```


# STUDENT

+ CREATE Student
   - Endpoint : /students
   - Method : POST
   - request : body
   #
    ```
    {
      name : "Benjamin",
      ClassId : "1",
    }
    ```
   #
   #### Respon Success Status Code (201)
   Ini adalah tampilan setelah data student berhasil di buat
   
    ```{
    {
    "msg": "Success Create New Student",
    "student": {
        "id": 1,
        "name": "Benjamin",
        "ClassId": "1",
        "updatedAt": "2021-10-03T17:18:15.626Z",
        "createdAt": "2021-10-03T17:18:15.626Z"
    }
   }
    ```

+ GET All Student
   - Endpoint : /students
   - Method : GET
   
   #
   #### Respon Success Status Code (200)
   Ini adalah tampilan apabila berhasil menampilkan seluruh data dari database student
   
    ```{
    {
   {
    "msg": "Success Get All Data of Student",
    "student": [
        {
            "id": 1,
            "name": "Benjamin",
            "Class": {
                "id": 1,
                "name": "Kelas 1 Renamed"
            }
        }
    ],
    "currentUser": {
        "id": 1,
        "name": "admin",
        "email": "admin@gmail.com",
        "role": "admin",
        "Class": null
    }
   }
    ```

+ UPDATE Student
   - Endpoint : /students/:id
   - Method : PUT
   - Request : Body
   
   #
   ```
    {
      name : "dedy",
      ClassId : "2",
    }
    ```
   # 
   #### Respon Success Status Code (200)
   Ini adalah tampilan apabila berhasil melakukan update terhadap salah satu data student
   
    ```{
    {
    "status": "Student Updated",
    "detail": {
        "name": "dedy",
        "ClassId": "2"
    }
   }
    ```
    
+ DELETE Students
   - Endpoint : /students/:id
   - Method : DELETE
   
   # 
   #### Respon Success Status Code (200)
   Ini adalah tampilan apabila berhasil melakukan update terhadap salah satu data student
   
    ```{
    {
    "msg": "Success Delete Data"
   }
    ```
   # 
   #### Error Respon
   Ini adalah tampilan apabila tidak berhasil melakukan update terhadap salah satu data student
   
    ```{
    {
    "msg": "Data is Empty"
   }
    ```

# MAPEL

+ CREATE Mapel
   - Endpoint : /mapels
   - Method : POST
   - request : body
   #
    ```
    {
      nama_mapel : "Bahasa Indonesia",
    }
    ```
   #
   #### Respon Success Status Code (201)
   Ini adalah tampilan setelah data Mapel berhasil dibuat
   
    ```{
   {
    "msg": "Success Create New Mapel",
    "mapel": {
        "id": 6,
        "nama_mapel": "Bahasa Indonesia",
        "updatedAt": "2021-10-03T17:42:57.318Z",
        "createdAt": "2021-10-03T17:42:57.318Z"
    }
   }
    ```
  #
+ GET All Mapel
   - Endpoint : /mapels
   - Method : GET

   #
   #### Respon Success Status Code (200)
   Ini adalah tampilan setelah berhasil menapilkan data Mapel
   
    ```{
   {
    "message": "Success",
    "mapel": [
        {
            "id": 1,
            "nama_mapel": "Matematika",
            "createdAt": "2021-10-03T16:31:23.000Z",
            "updatedAt": "2021-10-03T16:31:23.000Z"
        },
        {
            "id": 2,
            "nama_mapel": "Bahasa Indonesia",
            "createdAt": "2021-10-03T16:31:23.000Z",
            "updatedAt": "2021-10-03T16:31:23.000Z"
        },
        {
            "id": 3,
            "nama_mapel": "Ilmu Pengetahuan Alam",
            "createdAt": "2021-10-03T16:31:23.000Z",
            "updatedAt": "2021-10-03T16:31:23.000Z"
        },
        {
            "id": 4,
            "nama_mapel": "Ilmu Pengetahuan Sosial",
            "createdAt": "2021-10-03T16:31:23.000Z",
            "updatedAt": "2021-10-03T16:31:23.000Z"
        },
        {
            "id": 5,
            "nama_mapel": "Bahasa Inggris",
            "createdAt": "2021-10-03T16:31:23.000Z",
            "updatedAt": "2021-10-03T16:31:23.000Z"
        },
        {
            "id": 6,
            "nama_mapel": "Bahasa Indonesia",
            "createdAt": "2021-10-03T17:42:57.000Z",
            "updatedAt": "2021-10-03T17:42:57.000Z"
        }
    ]
   }
    ```
    
    #
+ UPDATE Mapel
   - Endpoint : /mapels/:id
   - Method : PATCH
   - Request : body
   #
   
   ```
    {
      nama_mapel : "Bahasa Sunda",
    }
    ```

   #
   #### Respon Success Status Code (200)
   Ini adalah tampilan setelah berhasil mengubah data Mapel sesuai Id yang ditentukan
   
    ```{
   {
    "status": "success",
    "data": {
        "id": 6,
        "nama_mapel": "Bahasa Sunda",
        "createdAt": "2021-10-03T17:42:57.000Z",
        "updatedAt": "2021-10-03T17:51:42.075Z"
    }
   }
    ```
     #
   #### Error Respon
   Ini adalah tampilan apabila system tidak menemukan data yang sesuai dengan id yang ditentukan
    ```{
   {
    "message": "Not Found, try with another id"
   }
    ```
    
#
+ DELETE Mapel
   - Endpoint : /mapels/:id
   - Method : DELETE

   #
   #### Respon Success Status Code (200)
   Ini adalah tampilan setelah berhasil menghapus data Mapel sesuai Id yang ditentukan
   
    ```{
   {
    "message": "sukses delete data"
   }
    ```
    #
   #### Error Respon
   Ini adalah tampilan apabila system tidak menemukan data yang sesuai dengan id yang ditentukan
    ```{
   {
    "message": "Not Found, try with another id"
   }
    ```

# SCORE

+ CREATE or ADD Score
   - Endpoint : /scores
   - Method : POST
   - request : body
   #
    ```
    {
    "studentId":2,
    "MapelId":1,
    "grade":"A"
   }
    ```
   #
   #### Respon Success Status Code (201)
   Ini adalah tampilan setelah data Score berhasil dibuat atau ditambahkan ke data siswa
   
    ```{
   {
    "result": [
        {
            "grade": "A",
            "StudentId": 5,
            "MapelId": 1,
            "createdAt": "2021-10-03T18:07:35.119Z",
            "updatedAt": "2021-10-03T18:07:35.119Z"
        }
    ],
    "currentUser": {
        "id": 2,
        "name": "Yusril",
        "email": "yusril@gmail.com",
        "role": "teacher",
        "Class": {
            "id": 1,
            "name": "Kelas 1 Renamed",
            "Teacher": 2
        }
    }
   }
    ```
    #### Error Respon
   Ini adalah tampilan apabila system tidak menemukan data yang sesuai dengan id yang ditentukan
    ```{
   {
    "message": "Student Not Found"
   }
    ```
    
+ GET ALL Score
   - Endpoint : /scores
   - Method : GET
   
   #
   #### Respon Success Status Code (200)
   Ini adalah tampilan setelah semua data Score berhasil dipanggil dari database menggunakan Method GET
   
    ```{
   {
    "score": [
        {
            "studentId": 5,
            "MapelId": 1,
            "grade": "A",
            "Student": {
                "name": "Carlos",
                "ClassId": 1
            }
        }
    ],
    "currentUser": {
        "id": 1,
        "name": "admin",
        "email": "admin@gmail.com",
        "role": "admin",
        "Class": null
    }
   }
    ```

+ UPDATE Score
   - Endpoint : /scores/:id
   - Method : PATCH
   - Request : Body
   #
    ```
    {
    "studentId":2,
    "MapelId":1,
    "grade":"B"
   }
    ```
   #
   #### Respon Success Status Code (200)
   Ini adalah tampilan setelah salah satu data berhasil di update menggunakan method PATCH
   
    ```{
   {
    "status": "success",
    "data": {
        "studentId": 2,
        "MapelId": 1,
        "grade": "B",
        "createdAt": "2021-10-03T18:07:35.000Z",
        "updatedAt": "2021-10-03T18:14:56.181Z",
        "StudentId": 5
    }
   }
    ```
    
+ DELETE Score
   - Endpoint : /scores/:id
   - Method : DELETE
   
   #### Respon Success Status Code (200)
   Ini adalah tampilan setelah berhasil menghapus salah satu data dari database score
   
    ```{
   {
    "message": "data berhasil dihapus"
   }
    ```

    
