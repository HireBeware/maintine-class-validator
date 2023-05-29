# maintine-class-validator

Use class-validator with Mantine forms

#### Example

```
const form = useForm<CreateReviewDTO>({
    dto: new CreateReviewDTO(),
    initialValues: {
        title: props.myReview?.title || '',
        rating: props.myReview?.rating || 0,
        review: props.myReview?.review || '',
        reviewNameType: ReviewNameType.Anonymous
      },
    transform: (dto: CreateReviewDTO) => {
        dto.rating = parseInt(dto.rating as unknown as string) || 0;
        dto.reviewNameType = parseInt(dto.reviewNameType as unknown as string) || 0;
        return dto;
      }
});
```

#### Extra

There is type safety with form fields, by accessing form.fields:

```
<TextInput label="Title" {...form.getInputProps(form.fields.title)}/>
```
