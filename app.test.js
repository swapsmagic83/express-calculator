const {mean,median,mode} =require("./app");

describe("mean",function(){
    it("finds the mean of an even array", function(){ 
        expect(mean([1,2,3,2])).toEqual(2)
      })
      it("finds the mean of an odd array", function () { 
        expect(mean([1, 2, 3])).toEqual(2)
      })
      it("finds mean of empty array",function(){
        expect(mean([])).toEqual(NaN)
      })
})

describe("median",function(){
    it("finds the median of odd array",function(){
        expect(median([1,3,3,6,7,8,9])).toEqual(6)
    })
    it("finds the median of even array",function(){
        expect(median([1,2,3,4,5,6,7,8])).toEqual(4.5)
    })
})

describe("mode",function(){
    it("finds mode of array",function(){
        expect(mode([1,2,2,3,3,3])).toEqual(3)
    })
})