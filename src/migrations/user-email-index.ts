import { Db } from 'mongodb';

// 사용자의 이메일을 Unique Index로 설정
// 왜? 사용자의 이메일은 중복되면 안되기 때문이고
// 중복 방지와 검색 속도 향상을 위해 인덱스를 설정
module.exports = {
  async up(db: Db) {
    await db.collection('users').createIndex(
      // 오름차순으로 인덱스 생성
      {
        email: 1,
      },
      // 중복된 값이 없도록 설정
      {
        unique: true,
      },
    );
  },
};
