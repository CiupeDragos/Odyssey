import { LoungeThread, LoungeThreadDbModel, LoungeThreadModel } from "./model";

export function getThread(threadId: string) {
  return LoungeThreadModel.findById(threadId);
}

export async function addThread(threadDbModel: LoungeThreadDbModel) {
  const newThread = await new LoungeThreadModel(threadDbModel).save();

  return newThread.id;
}

export async function getThreads(authorId?: string) {
  let threadsDbModels;

  if (authorId) {
    threadsDbModels = await LoungeThreadModel.find({ authorId: authorId });
  } else {
    threadsDbModels = await LoungeThreadModel.find();
  }

  const loungeThreads = threadsDbModels.map((dbModel) => {
    const thread: LoungeThread = {
      id: dbModel.id,
      threadType: dbModel.threadType,
      authorId: dbModel.authorId,
      authorUsername: dbModel.authorUsername,
      title: dbModel.title,
      content: dbModel.content,
      answers: dbModel.answers,
      timestamp: dbModel.timestamp,
    };

    return thread;
  });

  return loungeThreads;
}
