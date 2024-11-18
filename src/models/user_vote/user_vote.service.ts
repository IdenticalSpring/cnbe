// user-vote.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserVote } from './entities/user_vote.entity';
import { User } from 'src/models/users/entities/user.entity';
import { Discussions } from 'src/models/discussion/entities/discussion.entity';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UserVoteService {
  constructor(
    @InjectModel(UserVote)
    private readonly userVoteModel: typeof UserVote,
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(Discussions)
    private readonly discussionModel: typeof Discussions,
  ) {}

  async voteOnDiscussion(
    userId: number,
    discussionId: number,
    voteType: 'upvote' | 'downvote',
  ) {
    // Tìm user vote hiện tại
    const existingVote = await this.userVoteModel.findOne({
      where: { userId, discussionId },
    });

    // Lấy bài thảo luận
    const discussion = await this.discussionModel.findByPk(discussionId);
    if (!discussion) {
      throw new BadRequestException('Discussion not found.');
    }

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        throw new BadRequestException(
          `User has already ${voteType}d on this discussion.`,
        );
      }

      // Nếu user đã vote kiểu ngược lại, giảm giá trị cũ trước khi chuyển đổi
      if (existingVote.voteType === 'upvote') {
        discussion.voteUp -= 1;
      } else if (existingVote.voteType === 'downvote') {
        discussion.voteDown -= 1;
      }

      // Cập nhật vote của người dùng
      existingVote.voteType = voteType;
      await existingVote.save();
    } else {
      // Nếu user chưa vote, tạo mới
      await this.userVoteModel.create({
        userId,
        discussionId,
        voteType,
      });
    }

    // Tăng giá trị vote mới
    if (voteType === 'upvote') {
      discussion.voteUp += 1;
    } else {
      discussion.voteDown += 1;
    }

    await discussion.save();

    return {
      message: `Successfully voted ${voteType} for discussion.`,
      voteUp: discussion.voteUp,
      voteDown: discussion.voteDown,
    };
  }
}
