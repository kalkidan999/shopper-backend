const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

// const ProductCounterSchema = mongoose.Schema({
//     _id: {type: String, required: true},
//     seq: { type: Number, default: 0 }
// });
// const counter = mongoose.model('counter', ProductCounterSchema);

const ProductSchema = new mongoose.Schema(
    {
        id: {type: Number, unique: true},
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        pictureUrl: { type: String, required: true },
        productType: { type: String, required: true },
        productBrand: { type: String, required: true },
    }, {collection: "products"}
    // {
    //     timestamps: true,
    //     versionKey: false,
    //     autoIndex: false
    // }
)

ProductSchema.plugin(AutoIncrement, {id:'productId',inc_field: 'id'});

// to create the product counter collection for the first time uncomment this
// counter.create({_id: 'productId'})

// ProductSchema.pre('save', (next) => {
//     const doc = this;
//     counter.findByIdAndUpdate({_id: 'productId'},
//         { $inc: { seq: 1 } },
//         { new: true, upsert: true },
//         function(error, counter)   {
//             if(error)
//                 return next(error);
//             doc.id = counter.seq;
//             next();
//     });
// });



// uncomment this to create indexes for text using the above
// ProductSchema.index({ name: 'text', description: 'text', productBrand: 'text', productType: 'text' })
// product_model.createIndexes()


const product_model = mongoose.model('ProductSchema', ProductSchema)


module.exports = product_model;
