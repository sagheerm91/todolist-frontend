import instance from "./todoInterceptor";

const baseUrl = process.env.REACT_APP_BASE_URL;

class CourseService{
    async getAllCourses({page, limit, search}) {
        try {
          const response = await instance.get(`${baseUrl}/courses/get-courses`, {
            params: { page, limit, search } });
          return response.data.data;
        } catch (error) {
          if (error.response && error.response.status === 409) {
            return { error: "Course already exists" };
          }
          return { error: "Error creating course" };
        }
      }

      async getUserOrders({userId}){
        try {
          const response = await instance.get(`${baseUrl}/courses/get-orders-by-user/${userId}`);
          // console.log('====================================');
          // console.log("Orders --- ", response.data);
          // console.log('====================================');
          return response.data;
        } catch (error) {
          
        }
      }

      async getCoursesByUser({userId, page, limit, search}) {
        try {
          const response = await instance.get(`${baseUrl}/courses/get-courses-by-user/${userId}`,{
            params: { page, limit, search } 
          });
          return response.data.data;
        } catch (error) {
          
          return { error: error };
        }
      }

      async createCourse({ course }) {
        const response = await instance.post(
          `${baseUrl}/courses/create-course`,
          course, {
            headers : {
              "Content-Type": "multipart/form-data"
          }
          }
        );
  
        return response;
    }

    async getSingleCourse(id) {
      const response = await instance.get(
        `${baseUrl}/courses/get-single-course/${id}`
      );

      return response.data.data;
  }

    async updateCourse({ id, course }) {
      try {
        
        const userId = course.createdBy;

        const res = await instance.put(
          `${baseUrl}/courses/update-course/${id}`,
          course, {
            headers : {
              "Content-Type": "multipart/form-data",
              "UserIdFromCourse":`${userId}`
          }
          }
        );
  
        if (res) {
          //console.log("Response:", res);
          return res.data;
        }
        else{
          return res.message;
        }
      } catch (error) {
        throw error;
      }
    }

    async purchaseCourse({course}){
      try {

        // console.log('====================================');
        // console.log("USER ID --- ", userId);
        // console.log("COURSE ID --- ", courseId)
        // console.log('====================================');

        const res = await instance.post(`${baseUrl}/courses/create-checkout-session`, course);
        return res.data;
      } catch (error) {
        throw error;
      }
    }
    async deleteCourse({ id }) {
      try {
        const response = await instance.delete(
          `${baseUrl}/courses/delete-course/` + id
        );
        return response;
      } catch (error) {
        throw error;
      }
    };

    async makePaymentRequest({totalPrice, name, user, ids}){
      try {
        // console.log('====================================');
        // console.log("Price & Name ", {totalPrice, name});
        // console.log('====================================');
        const res = await instance.post(`${baseUrl}/courses/create-checkout-session`,  {
          totalPrice: totalPrice,
          name: name,
          user: user,
          ids: ids,
        });
        return res.data;
      } catch (error) {
        throw error;
      }
    }

    async savePaymentDetails({sessionId, orderId}){
      try {
        const res = await instance.post(`${baseUrl}/courses/save-payment-details`, {
          sessionId: sessionId,
          orderId: orderId,
        });
        return res;
      } catch (error) {
        throw error;
      }
    }
    
    async cancelPayment({orderId}){
      try {
        const res = await instance.post(`${baseUrl}/courses/canel-payment`, {
          orderId: orderId,
        });
        return res;
      } catch (error) {
        throw error;
      }
    }
};
export default new CourseService();
