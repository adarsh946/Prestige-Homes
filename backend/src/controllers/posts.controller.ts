import prisma from "../lib/db";

export const getPost = async (req: any, res: any) => {
  const id = req.params.id;

  try {
    const post = await prisma.posts.findUnique({
      where: { id },
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found!",
      });
    }
    return res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      message: "Post not found!",
    });
  }
};

export const getAllPosts = async (req: any, res: any) => {
  try {
    const allPosts = await prisma.posts.findMany();
    if (!allPosts) {
      return res.status(404).json({
        message: "posts not found!",
      });
    }

    return res.status(200).json({
      allPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "posts not found!",
    });
  }
};

export const addPosts = async (req: any, res: any) => {
  const tokenId = req.userId;
  const body = req.body;

  try {
    const post = await prisma.posts.create({
      data: {
        ...body.postData,
        userId: tokenId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });

    if (!post) {
      return res.status(404).json({
        message: "not able to add the post!",
      });
    }

    return res.status(404).json({ post });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "Problem in adding the post!",
    });
  }
};

export const updatePosts = async (req: any, res: any) => {
  const id = req.params.id;
  const tokenId = req.userId;
  const body = req.body;

  try {
    const updatedPost = await prisma.posts.update({
      where: { id },
      data: {
        ...body,
        userId: tokenId,
      },
    });

    if (!updatedPost) {
      return res.status(404).json({
        message: "updating unsuccessful!",
      });
    }

    return res.status(200).json({ updatedPost });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "updating the post is unsuccessful!",
    });
  }
};

export const deletePosts = async (req: any, res: any) => {
  const id = req.params.id;
  const tokenId = req.userId;

  try {
    const user = await prisma.posts.findUnique({
      where: { id },
    });

    if (user?.id !== tokenId) {
      return res.status(404).json({
        message: "Not authorized",
      });
    }

    const post = await prisma.posts.delete({
      where: { id },
    });

    return res.status(200).json({
      message: "post has been deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "post is not deleted!",
    });
  }
};
