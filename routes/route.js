import express from 'express'

import { signupUser, loginUser, forgotPassword, testy,updateProfile,getOrders,getAllOrders,orderStatus} from '../controller/user-controller.js';
import { authenticateToken, isAdmin } from '../controller/jwt-controller.js';
import { createCategory,updateCategory,getAllCategories,getCategory,deleteCategory } from '../controller/category-controller.js';
import { createProduct,updateProduct,getProduct,getSingleProduct,getProductPhoto,deleteProduct,productFilter,productCount,productList,searchProduct,productCategory,braintreeToken,braintreePayment } from '../controller/product-controller.js';
import formidable from 'express-formidable'

const router=express.Router();

router.post('/signup',signupUser)
router.post('/login',loginUser)
router.post('/forgot-password',forgotPassword)
// router.get('/test',authenticateToken,isAdmin,testy)
router.get('/user-auth',authenticateToken,(request,response)=>{
    response.status(200).send({ok:true});
})
router.get('/admin-auth',authenticateToken,isAdmin,(request,response)=>{
    response.status(200).send({ok:true});
})

router.put('/profile',authenticateToken,updateProfile)

router.post('/create-category',authenticateToken,isAdmin,createCategory)
router.put('/update-category/:id',authenticateToken,isAdmin,updateCategory)
router.get('/getAllCategories',getAllCategories)
router.get('/getCategory/:slug',getCategory)
router.delete('/delete-category/:id',authenticateToken,isAdmin,deleteCategory)

router.post('/create-product',authenticateToken,isAdmin,formidable(),createProduct)
router.put('/update-product/:pid',authenticateToken,isAdmin,formidable(),updateProduct)
router.get('/get-product',getProduct)
router.get('/get-product/:slug',getSingleProduct)
router.get('/product-photo/:pid',getProductPhoto)
router.delete('/delete-product/:pid',deleteProduct)

router.post('/product-filters',productFilter)

router.get('/product-count',productCount)
router.get('/product-list/:page',productList)

router.get('/search/:keyword',searchProduct)

router.get('/product-category/:slug',productCategory)


router.get('/braintree/token',braintreeToken)

router.post('/braintree/payment',braintreePayment)

router.get('/orders',authenticateToken,getOrders)
router.get('/all-orders',authenticateToken,isAdmin,getAllOrders)

router.put('/order-status/:orderId',authenticateToken,isAdmin,orderStatus)

export default router