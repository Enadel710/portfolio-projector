// This mixin contains a method to send http post requests using axios.
// It returns a promise for the response

import axios from 'axios'

export default {
    methods: {
        post(url, params) {
            return new Promise((resolve, reject) => {
                axios.post(url, params)
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        }
    }
}